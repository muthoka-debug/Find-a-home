from django.db import models
from django.conf import settings
from listings.models import Listing, StyleTag

class UserPreferenceProfile(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="preference_profile")
	preferred_counties = models.JSONField(default=list, blank=True)
	budget_min = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
	budget_max = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
	bedrooms = models.PositiveIntegerField(null=True, blank=True)
	furnishing = models.BooleanField(null=True, blank=True)
	style_tags = models.ManyToManyField(StyleTag, blank=True)

	def __str__(self):
		return f"Preferences for {self.user.username}"

class ListingViewEvent(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
	county = models.CharField(max_length=100)
	viewed_at = models.DateTimeField(auto_now_add=True)
	dwell_time = models.PositiveIntegerField(help_text="Seconds spent viewing", null=True, blank=True)

class ListingSaveEvent(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
	saved_at = models.DateTimeField(auto_now_add=True)

class RecommendationImpression(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
	recommended_at = models.DateTimeField(auto_now_add=True)
	rank = models.PositiveIntegerField()
	clicked = models.BooleanField(default=False)
