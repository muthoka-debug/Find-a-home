from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from collections import Counter
from listings.models import Listing
from listings.serializers import ListingSerializer

from .models import UserPreferenceProfile, ListingViewEvent, ListingSaveEvent, RecommendationImpression
from .serializers import (
	UserPreferenceProfileSerializer,
	ListingViewEventSerializer,
	ListingSaveEventSerializer,
	RecommendationImpressionSerializer,
	RecommendationResultSerializer,
)
from .permissions import IsOwnerOrAdmin

class UserPreferenceProfileViewSet(viewsets.ModelViewSet):
	serializer_class = UserPreferenceProfileSerializer
	permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

	def get_queryset(self):
		if self.request.user.role == 'ADMIN':
			return UserPreferenceProfile.objects.all()
		return UserPreferenceProfile.objects.filter(user=self.request.user)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

class ListingViewEventViewSet(viewsets.ModelViewSet):
	serializer_class = ListingViewEventSerializer
	permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

	def get_queryset(self):
		if self.request.user.role == 'ADMIN':
			return ListingViewEvent.objects.all()
		if self.request.user.role in ['LANDLORD', 'AGENT']:
			return ListingViewEvent.objects.filter(Q(listing__agent=self.request.user) | Q(user=self.request.user))
		return ListingViewEvent.objects.filter(user=self.request.user)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

class ListingSaveEventViewSet(viewsets.ModelViewSet):
	serializer_class = ListingSaveEventSerializer
	permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

	def get_queryset(self):
		if self.request.user.role == 'ADMIN':
			return ListingSaveEvent.objects.all()
		if self.request.user.role in ['LANDLORD', 'AGENT']:
			return ListingSaveEvent.objects.filter(Q(listing__agent=self.request.user) | Q(user=self.request.user))
		return ListingSaveEvent.objects.filter(user=self.request.user)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

class RecommendationImpressionViewSet(viewsets.ModelViewSet):
	serializer_class = RecommendationImpressionSerializer
	permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

	def get_queryset(self):
		if self.request.user.role == 'ADMIN':
			return RecommendationImpression.objects.all()
		if self.request.user.role in ['LANDLORD', 'AGENT']:
			return RecommendationImpression.objects.filter(Q(listing__agent=self.request.user) | Q(user=self.request.user))
		return RecommendationImpression.objects.filter(user=self.request.user)

	def perform_update(self, serializer):
		# Allow owner/admin to update clicked state without changing ownership fields.
		serializer.save()

class RecommendedListingsView(APIView):
	"""
	API endpoint that returns custom listing recommendations for the authenticated user
	based on their UserPreferenceProfile and viewing history.
	"""
	permission_classes = [permissions.IsAuthenticated]

	# Lightweight county-neighborhood map for Kenya-focused location intent fallback.
	NEARBY_COUNTIES = {
		"Nairobi": {"Kiambu", "Machakos", "Kajiado"},
		"Kiambu": {"Nairobi", "Muranga", "Nyandarua"},
		"Machakos": {"Nairobi", "Makueni", "Kajiado"},
		"Kajiado": {"Nairobi", "Machakos"},
		"Mombasa": {"Kwale", "Kilifi"},
		"Nakuru": {"Baringo", "Narok", "Nyandarua"},
	}

	def _nearby_counties_for(self, counties):
		nearby = set()
		for county in counties:
			nearby.update(self.NEARBY_COUNTIES.get(county, set()))
		return nearby

	def get(self, request, *args, **kwargs):
		user = request.user
		from django.utils import timezone
		
		# 1. Base Queryset: Everything active and verified, exclude user's own listings
		base_qs = Listing.objects.filter(is_active=True, is_verified=True).exclude(agent=user).prefetch_related('style_tags', 'amenities')
		
		# 2. Try to grab the user's preference profile.
		pref_profile = UserPreferenceProfile.objects.filter(user=user).first()
		user_pref_styles = set(pref_profile.style_tags.values_list('id', flat=True)) if pref_profile else set()
		preferred_counties = set(pref_profile.preferred_counties) if pref_profile and pref_profile.preferred_counties else set()
		
		# 3. Grab behavioral history from views and saves.
		recent_views = ListingViewEvent.objects.filter(user=user).select_related('listing')
		recent_saves = ListingSaveEvent.objects.filter(user=user).select_related('listing')

		viewed_counties = set(recent_views.values_list('county', flat=True))
		saved_counties = set(recent_saves.values_list('listing__county', flat=True))
		interest_counties = preferred_counties.union(viewed_counties).union(saved_counties)
		nearby_interest_counties = self._nearby_counties_for(interest_counties)

		viewed_property_types = Counter(recent_views.values_list('listing__property_type', flat=True))
		saved_property_types = Counter(recent_saves.values_list('listing__property_type', flat=True))
		saved_property_types_weighted = Counter(
			{k: v * 2 for k, v in saved_property_types.items()}
		)
		property_type_affinity = viewed_property_types + saved_property_types_weighted
		affinity_total = sum(property_type_affinity.values())

		saved_style_ids = set(
			recent_saves.values_list('listing__style_tags__id', flat=True)
		)
		saved_style_ids.discard(None)
		all_style_affinities = user_pref_styles.union(saved_style_ids)
		
		# 4. Scoring Algorithm based on: Location (0.45), Design (0.30), Interior (0.20), Freshness (0.05)
		scored_listings = []
		now = timezone.now()
		
		for listing in base_qs:
			location_score = 0.0
			design_score = 0.0
			interior_score = 0.0
			freshness_score = 0.0

			# Location Match (max 1.0)
			if listing.county in preferred_counties:
				location_score = 1.0
			elif listing.county in viewed_counties or listing.county in saved_counties:
				location_score = 0.85
			elif listing.county in nearby_interest_counties:
				location_score = 0.6
			
			# Design Affinity (max 1.0) - based on style tags + property type behavior.
			listing_styles = set(listing.style_tags.values_list('id', flat=True))
			style_component = 0.0
			type_component = 0.0

			if all_style_affinities and listing_styles:
				intersection = len(all_style_affinities.intersection(listing_styles))
				style_component = min(1.0, intersection / len(all_style_affinities))

			if affinity_total > 0 and listing.property_type in property_type_affinity:
				type_component = min(1.0, property_type_affinity[listing.property_type] / affinity_total)

			design_score = min(1.0, (0.7 * style_component) + (0.3 * type_component))
			
			# Interior Affinity (max 1.0) - based on budget, bedrooms, furnishing
			interior_factors = 0
			interior_matches = 0
			if pref_profile:
				if pref_profile.budget_min or pref_profile.budget_max:
					interior_factors += 1
					if (not pref_profile.budget_min or listing.price >= pref_profile.budget_min) and \
					   (not pref_profile.budget_max or listing.price <= pref_profile.budget_max):
						interior_matches += 1
						
				if pref_profile.bedrooms:
					interior_factors += 1
					if listing.bedrooms == pref_profile.bedrooms:
						interior_matches += 1
						
				if pref_profile.furnishing is not None:
					interior_factors += 1
					if listing.is_furnished == pref_profile.furnishing:
						interior_matches += 1
						
			if interior_factors > 0:
				interior_score = interior_matches / interior_factors
				
			# Freshness (max 1.0) - decays over 30 days
			days_old = (now - listing.created_at).days
			freshness_score = max(0.0, 1.0 - (days_old / 30.0))
			
			# Final Weighted Score
			final_score = (0.45 * location_score) + (0.30 * design_score) + (0.20 * interior_score) + (0.05 * freshness_score)
			
			scored_listings.append((final_score, listing))
			
		# 5. Sort strictly by descending score, then by newest listing
		scored_listings.sort(key=lambda x: (x[0], x[1].created_at.timestamp()), reverse=True)
		top_listings = [item[1] for item in scored_listings[:10]] # limit to 10 for now
		
		# 6. Log recommendation impression and return IDs for click tracking.
		response_items = []
		for index, (score, listing) in enumerate(scored_listings[:10]):
			impression = RecommendationImpression.objects.create(
				user=user,
				listing=listing,
				rank=index + 1
			)
			response_items.append({
				"impression_id": impression.id,
				"rank": impression.rank,
				"score": round(score, 4),
				"listing": listing,
			})

		# 7. Serialize and return
		serializer = RecommendationResultSerializer(response_items, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
