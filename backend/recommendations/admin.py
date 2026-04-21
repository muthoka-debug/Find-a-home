from django.contrib import admin
from .models import UserPreferenceProfile, ListingViewEvent, ListingSaveEvent, RecommendationImpression

@admin.register(UserPreferenceProfile)
class UserPreferenceProfileAdmin(admin.ModelAdmin):
	list_display = ("user",)
	search_fields = ("user__username",)

@admin.register(ListingViewEvent)
class ListingViewEventAdmin(admin.ModelAdmin):
	list_display = ("user", "listing", "county", "viewed_at", "dwell_time")
	list_filter = ("county", "viewed_at")
	search_fields = ("user__username", "listing__title")

@admin.register(ListingSaveEvent)
class ListingSaveEventAdmin(admin.ModelAdmin):
	list_display = ("user", "listing", "saved_at")
	search_fields = ("user__username", "listing__title")

@admin.register(RecommendationImpression)
class RecommendationImpressionAdmin(admin.ModelAdmin):
	list_display = ("user", "listing", "recommended_at", "rank", "clicked")
	list_filter = ("clicked",)
	search_fields = ("user__username", "listing__title")
