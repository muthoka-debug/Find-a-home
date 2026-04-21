from rest_framework.routers import DefaultRouter
from .views import ListingViewSet, StyleTagViewSet, AmenityViewSet

router = DefaultRouter()
router.register(r'listings', ListingViewSet, basename='listing')
router.register(r'style-tags', StyleTagViewSet, basename='styletag')
router.register(r'amenities', AmenityViewSet, basename='amenity')

urlpatterns = router.urls
