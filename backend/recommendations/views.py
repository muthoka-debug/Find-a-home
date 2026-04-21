from rest_framework import viewsets, permissions
from django.db.models import Q
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
