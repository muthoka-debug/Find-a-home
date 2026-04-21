from rest_framework import serializers
from .models import UserPreferenceProfile, ListingViewEvent, ListingSaveEvent, RecommendationImpression
from listings.serializers import ListingSerializer, StyleTagSerializer

class UserPreferenceProfileSerializer(serializers.ModelSerializer):
    style_tags = StyleTagSerializer(many=True, read_only=True)
    class Meta:
        model = UserPreferenceProfile
        fields = ['id', 'user', 'preferred_counties', 'budget_min', 'budget_max', 'bedrooms', 'furnishing', 'style_tags']

class ListingViewEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingViewEvent
        fields = ['id', 'user', 'listing', 'county', 'viewed_at', 'dwell_time']

class ListingSaveEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingSaveEvent
        fields = ['id', 'user', 'listing', 'saved_at']

class RecommendationImpressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendationImpression
        fields = ['id', 'user', 'listing', 'recommended_at', 'rank', 'clicked']
