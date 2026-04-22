from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from listings.models import Listing
from listings.serializers import ListingSerializer

from .models import UserPreferenceProfile, ListingViewEvent, ListingSaveEvent, RecommendationImpression
from .serializers import (
	UserPreferenceProfileSerializer,
	ListingViewEventSerializer,
	ListingSaveEventSerializer,
	RecommendationImpressionSerializer,
)
from .permissions import IsOwnerOrAdmin

class UserPreferenceProfileViewSet(viewsets.ModelViewSet):
	serializer_class = UserPreferenceProfileSerializer
	permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

	def get_queryset(self):
		if self.request.user.role == 'ADMIN':
			return UserPreferenceProfile.objects.all()
		return UserPreferenceProfile.objects.filter(user=self.request.user)

class ListingViewEventViewSet(viewsets.ModelViewSet):
	serializer_class = ListingViewEventSerializer
	permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

	def get_queryset(self):
		if self.request.user.role == 'ADMIN':
			return ListingViewEvent.objects.all()
		if self.request.user.role in ['LANDLORD', 'AGENT']:
			return ListingViewEvent.objects.filter(Q(listing__agent=self.request.user) | Q(user=self.request.user))
		return ListingViewEvent.objects.filter(user=self.request.user)

class ListingSaveEventViewSet(viewsets.ModelViewSet):
	serializer_class = ListingSaveEventSerializer
	permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

	def get_queryset(self):
		if self.request.user.role == 'ADMIN':
			return ListingSaveEvent.objects.all()
		if self.request.user.role in ['LANDLORD', 'AGENT']:
			return ListingSaveEvent.objects.filter(Q(listing__agent=self.request.user) | Q(user=self.request.user))
		return ListingSaveEvent.objects.filter(user=self.request.user)

class RecommendationImpressionViewSet(viewsets.ModelViewSet):
	serializer_class = RecommendationImpressionSerializer
	permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

	def get_queryset(self):
		if self.request.user.role == 'ADMIN':
			return RecommendationImpression.objects.all()
		if self.request.user.role in ['LANDLORD', 'AGENT']:
			return RecommendationImpression.objects.filter(Q(listing__agent=self.request.user) | Q(user=self.request.user))
		return RecommendationImpression.objects.filter(user=self.request.user)

class RecommendedListingsView(APIView):
	"""
	API endpoint that returns custom listing recommendations for the authenticated user
	based on their UserPreferenceProfile and viewing history.
	"""
	permission_classes = [permissions.IsAuthenticated]

	def get(self, request, *args, **kwargs):
		user = request.user
		from django.utils import timezone
		
		# 1. Base Queryset: Everything active and verified, exclude user's own listings
		base_qs = Listing.objects.filter(is_active=True, is_verified=True).exclude(agent=user).prefetch_related('style_tags', 'amenities')
		
		# 2. Try to grab the user's preference profile
		pref_profile = UserPreferenceProfile.objects.filter(user=user).first()
		user_pref_styles = set(pref_profile.style_tags.values_list('id', flat=True)) if pref_profile else set()
		
		# 3. Grab recent county viewing history and design affinities from viewing history
		recent_views = ListingViewEvent.objects.filter(user=user).select_related('listing')
		viewed_counties = set(recent_views.values_list('county', flat=True))
		
		# 4. Scoring Algorithm based on: Location (0.45), Design (0.30), Interior (0.20), Freshness (0.05)
		scored_listings = []
		now = timezone.now()
		
		for listing in base_qs:
			location_score = 0.0
			design_score = 0.0
			interior_score = 0.0
			freshness_score = 0.0

			# Location Match (max 1.0)
			if pref_profile and pref_profile.preferred_counties and listing.county in pref_profile.preferred_counties:
				location_score = 1.0
			elif listing.county in viewed_counties:
				location_score = 0.8
			
			# Design Affinity (max 1.0) - based on style tags
			listing_styles = set(listing.style_tags.values_list('id', flat=True))
			if user_pref_styles and listing_styles:
				intersection = len(user_pref_styles.intersection(listing_styles))
				design_score = min(1.0, intersection / len(user_pref_styles))
			
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
		
		# 6. Log recommendation impression
		for index, listing in enumerate(top_listings):
			RecommendationImpression.objects.create(
				user=user,
				listing=listing,
				rank=index + 1
			)
		
		# 7. Serialize and return
		serializer = ListingSerializer(top_listings, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
