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
		
		# 1. Base Queryset: Everything active and verified, exclude user's own listings
		base_qs = Listing.objects.filter(is_active=True, is_verified=True).exclude(agent=user)
		
		# 2. Try to grab the user's preference profile
		pref_profile = UserPreferenceProfile.objects.filter(user=user).first()
		
		# 3. Grab recent county viewing history
		viewed_counties = ListingViewEvent.objects.filter(user=user).values_list('county', flat=True).distinct()
		
		# 4. Scoring Algorithm
		scored_listings = []
		for listing in base_qs:
			score = 0

			# Boost based on explicit preferences
			if pref_profile:
				if pref_profile.preferred_counties and listing.county in pref_profile.preferred_counties:
					score += 10
				
				# Budget matching
				if pref_profile.budget_min and listing.price >= pref_profile.budget_min:
					score += 5
				if pref_profile.budget_max and listing.price <= pref_profile.budget_max:
					score += 5
				
				# Attributes matching
				if pref_profile.bedrooms and listing.bedrooms == pref_profile.bedrooms:
					score += 5
				
				if pref_profile.furnishing is not None and listing.is_furnished == pref_profile.furnishing:
					score += 3
			
			# Boost based on implicit (viewing) history
			if listing.county in viewed_counties:
				score += 2
			
			scored_listings.append((score, listing))
			
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
