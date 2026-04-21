from django.db import models
from django.conf import settings

class StyleTag(models.Model):
	name = models.CharField(max_length=50, unique=True)
	def __str__(self):
		return self.name

class Amenity(models.Model):
	name = models.CharField(max_length=50, unique=True)
	def __str__(self):
		return self.name

class Listing(models.Model):
	PROPERTY_TYPE_CHOICES = [
		("BUNGALOW", "Bungalow"),
		("MAISONETTE", "Maisonette"),
		("APARTMENT", "Apartment"),
		("STUDIO", "Studio"),
		("BEDSITTER", "Bedsitter"),
		("OTHER", "Other"),
	]

	title = models.CharField(max_length=255)
	description = models.TextField()
	county = models.CharField(max_length=100)
	location = models.CharField(max_length=255)
	price = models.DecimalField(max_digits=12, decimal_places=2)
	bedrooms = models.PositiveIntegerField()
	bathrooms = models.PositiveIntegerField()
	property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES)
	style_tags = models.ManyToManyField(StyleTag, blank=True)
	amenities = models.ManyToManyField(Amenity, blank=True)
	is_furnished = models.BooleanField(default=False)
	is_verified = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	agent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="listings")
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f"{self.title} - {self.county}"

class ListingReport(models.Model):
	class Reason(models.TextChoices):
		FAKE_OR_SCAM = "FAKE", "Fake or Scam"
		UNAVAILABLE = "UNAVAILABLE", "No longer available"
		WRONG_INFO = "WRONG_INFO", "Incorrect Information"
		OTHER = "OTHER", "Other"

	class Status(models.TextChoices):
		PENDING = "PENDING", "Pending"
		RESOLVED = "RESOLVED", "Resolved"
		DISMISSED = "DISMISSED", "Dismissed"

	listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="reports")
	reported_by = models.ForeignKey(
		settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="submitted_reports"
	)
	reason = models.CharField(max_length=20, choices=Reason.choices)
	description = models.TextField(blank=True)
	status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
	created_at = models.DateTimeField(auto_now_add=True)
	resolved_at = models.DateTimeField(null=True, blank=True)
	resolved_by = models.ForeignKey(
		settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="resolved_reports"
	)

	def __str__(self):
		return f"Report for {self.listing.title} - {self.status}"
