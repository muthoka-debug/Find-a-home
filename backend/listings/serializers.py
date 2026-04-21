from rest_framework import serializers
from .models import Listing, StyleTag, Amenity, ListingReport

class StyleTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = StyleTag
        fields = ['id', 'name']

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name']

class ListingSerializer(serializers.ModelSerializer):
    style_tags = StyleTagSerializer(many=True, read_only=True)
    amenities = AmenitySerializer(many=True, read_only=True)
    agent = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Listing
        fields = [
            'id', 'title', 'description', 'county', 'location', 'price',
            'bedrooms', 'bathrooms', 'property_type', 'style_tags', 'amenities',
            'is_furnished', 'agent', 'created_at', 'updated_at'
        ]

class ListingReportSerializer(serializers.ModelSerializer):
    reported_by = serializers.StringRelatedField(read_only=True)
    status = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ListingReport
        fields = ['id', 'listing', 'reason', 'description', 'reported_by', 'status', 'created_at']
        read_only_fields = ['listing', 'reported_by', 'status', 'created_at']
