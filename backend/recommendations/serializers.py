from rest_framework import serializers
from .models import UserPreferenceProfile, ListingViewEvent, ListingSaveEvent, RecommendationImpression
from listings.serializers import ListingSerializer, StyleTagSerializer
from listings.models import StyleTag

class UserPreferenceProfileSerializer(serializers.ModelSerializer):
    style_tags = StyleTagSerializer(many=True, read_only=True)
    style_tag_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=StyleTag.objects.all(),
        write_only=True,
        required=False,
        source="style_tags",
    )

    class Meta:
        model = UserPreferenceProfile
        fields = [
            'id', 'user', 'preferred_counties', 'budget_min', 'budget_max',
            'bedrooms', 'furnishing', 'style_tags', 'style_tag_ids'
        ]
        read_only_fields = ['user', 'style_tags']

class ListingViewEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingViewEvent
        fields = ['id', 'user', 'listing', 'county', 'viewed_at', 'dwell_time']
        read_only_fields = ['user', 'viewed_at']

class ListingSaveEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingSaveEvent
        fields = ['id', 'user', 'listing', 'saved_at']
        read_only_fields = ['user', 'saved_at']

class RecommendationImpressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendationImpression
        fields = ['id', 'user', 'listing', 'recommended_at', 'rank', 'clicked']
        read_only_fields = ['user', 'recommended_at', 'rank', 'listing']


class RecommendationResultSerializer(serializers.Serializer):
    impression_id = serializers.IntegerField()
    rank = serializers.IntegerField()
    score = serializers.FloatField()
    listing = ListingSerializer()
