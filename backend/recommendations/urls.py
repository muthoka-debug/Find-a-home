from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserPreferenceProfileViewSet,
    ListingViewEventViewSet,
    ListingSaveEventViewSet,
    RecommendationImpressionViewSet,
    RecommendedListingsView
)

router = DefaultRouter()
router.register(r'user-preferences', UserPreferenceProfileViewSet, basename='userpreferenceprofile')
router.register(r'listing-view-events', ListingViewEventViewSet, basename='listingviewevent')
router.register(r'listing-save-events', ListingSaveEventViewSet, basename='listingsaveevent')
router.register(r'recommendation-impressions', RecommendationImpressionViewSet, basename='recommendationimpression')

urlpatterns = [
    path('recommended-listings/', RecommendedListingsView.as_view(), name='recommended-listings'),
    path('', include(router.urls)),
]
