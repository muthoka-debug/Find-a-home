from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Listing, StyleTag, Amenity, ListingReport
from .serializers import ListingSerializer, StyleTagSerializer, AmenitySerializer, ListingReportSerializer
from .permissions import ListingAccessPermission

class ListingViewSet(viewsets.ModelViewSet):
	serializer_class = ListingSerializer
	permission_classes = [ListingAccessPermission]

	def get_queryset(self):
		user = self.request.user
		
		# If the query includes ?my_listings=true and user is authenticated Landlord/Agent
		if self.request.query_params.get('my_listings') == 'true' and user.is_authenticated:
			return Listing.objects.filter(agent=user).order_by('-created_at')

		# Admin sees everything by default
		if user.is_authenticated and user.role == 'ADMIN':
			return Listing.objects.all().order_by('-created_at')
		
		# Public feed: only verified and active listings
		return Listing.objects.filter(is_verified=True, is_active=True).order_by('-created_at')

	def perform_create(self, serializer):
		# Automatically set the agent to the logged-in user
		serializer.save(agent=self.request.user)

	@action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
	def report(self, request, pk=None):
		listing = self.get_object()
		
		# Ensure they don't report their own listing
		if listing.agent == request.user:
			return Response({"detail": "You cannot report your own listing."}, status=status.HTTP_400_BAD_REQUEST)

		# Make sure they haven't reported it already
		if ListingReport.objects.filter(listing=listing, reported_by=request.user, status=ListingReport.Status.PENDING).exists():
			return Response({"detail": "You have already submitted a pending report for this listing."}, status=status.HTTP_400_BAD_REQUEST)

		serializer = ListingReportSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save(listing=listing, reported_by=request.user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StyleTagViewSet(viewsets.ModelViewSet):
	queryset = StyleTag.objects.all()
	serializer_class = StyleTagSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AmenityViewSet(viewsets.ModelViewSet):
	queryset = Amenity.objects.all()
	serializer_class = AmenitySerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
