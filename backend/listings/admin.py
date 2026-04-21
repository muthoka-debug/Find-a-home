from django.contrib import admin
from django.utils import timezone
from .models import Listing, StyleTag, Amenity, ListingReport

@admin.action(description="Verify selected listings")
def verify_listings(modeladmin, request, queryset):
	queryset.update(is_verified=True)

@admin.action(description="Unverify selected listings")
def unverify_listings(modeladmin, request, queryset):
	queryset.update(is_verified=False)

@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
	list_display = ("title", "county", "price", "property_type", "is_verified", "is_active", "agent", "created_at")
	list_filter = ("is_verified", "is_active", "county", "property_type", "created_at")
	search_fields = ("title", "county", "location", "description")
	actions = [verify_listings, unverify_listings]

	def get_queryset(self, request):
		qs = super().get_queryset(request)
		if request.user.role == 'ADMIN':
			return qs
		return qs.filter(agent=request.user)

	def has_change_permission(self, request, obj=None):
		if not obj:
			return True
		return request.user.role == 'ADMIN' or obj.agent == request.user

	def has_delete_permission(self, request, obj=None):
		if not obj:
			return True
		return request.user.role == 'ADMIN' or obj.agent == request.user

@admin.register(StyleTag)
class StyleTagAdmin(admin.ModelAdmin):
	search_fields = ("name",)

@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
	search_fields = ("name",)

@admin.action(description="Mark as Resolved & Unverify Listing")
def resolve_and_suspend(modeladmin, request, queryset):
	for report in queryset:
		report.status = 'RESOLVED'
		report.resolved_by = request.user
		report.resolved_at = timezone.now()
		report.save()
		report.listing.is_verified = False
		report.listing.is_active = False
		report.listing.save()

@admin.action(description="Dismiss Reports")
def dismiss_reports(modeladmin, request, queryset):
	queryset.update(status='DISMISSED', resolved_by=request.user, resolved_at=timezone.now())

@admin.register(ListingReport)
class ListingReportAdmin(admin.ModelAdmin):
	list_display = ("listing", "reason", "status", "reported_by", "created_at")
	list_filter = ("status", "reason", "created_at")
	search_fields = ("listing__title", "description", "reported_by__username")
	actions = [resolve_and_suspend, dismiss_reports]
	
	def get_queryset(self, request):
		qs = super().get_queryset(request)
		if request.user.role == 'ADMIN':
			return qs
		# Agents/Landlords can see reports against their own listings, but can't resolve them
		return qs.filter(listing__agent=request.user)

	def has_change_permission(self, request, obj=None):
		return request.user.role == 'ADMIN'

	def has_delete_permission(self, request, obj=None):
		return request.user.role == 'ADMIN'
