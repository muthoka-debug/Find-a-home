from rest_framework.routers import DefaultRouter
from .views import (
    UserPreferenceProfileViewSet,
    ListingViewEventViewSet,
    ListingSaveEventViewSet,
    RecommendationImpressionViewSet,
)

router = DefaultRouter()
router.register(r'user-preferences', UserPreferenceProfileViewSet, basename='userpreferenceprofile')
router.register(r'listing-view-events', ListingViewEventViewSet, basename='listingviewevent')
router.register(r'listing-save-events', ListingSaveEventViewSet, basename='listingsaveevent')
router.register(r'recommendation-impressions', RecommendationImpressionViewSet, basename='recommendationimpression')

urlpatterns = router.urls
