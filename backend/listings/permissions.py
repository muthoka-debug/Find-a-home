from rest_framework import permissions

class ListingAccessPermission(permissions.BasePermission):
    """
    Custom permission to enforce RBAC for listings:
    - Admin: can view, create, edit, delete any listing.
    - Landlord/Agent: can create listings. Can view, edit, delete ONLY their own listings.
    - House Hunter / Anonymous: can only view public/verified listings (handled in queryset). Cannot create, edit, or delete.
    """
    def has_permission(self, request, view):
        # Anyone can view (list/retrieve)
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Must be authenticated to modify or create
        if not request.user or not request.user.is_authenticated:
            return False
            
        # House hunters cannot create/edit/delete listings
        if request.user.role == 'HOUSE_HUNTER':
            return False
            
        # Admins, Landlords, and Agents can create
        return True

    def has_object_permission(self, request, view, obj):
        # Anyone can view individual public listings
        if request.method in permissions.SAFE_METHODS:
            # If the listing is not verified/active, only the owner or admin can view it
            if not obj.is_verified or not obj.is_active:
                return request.user.is_authenticated and (request.user.role == 'ADMIN' or obj.agent == request.user)
            return True

        # Must be authenticated to modify
        if not request.user or not request.user.is_authenticated:
            return False

        # Admins can do anything
        if request.user.role == 'ADMIN':
            return True
            
        # Landlord can only update own listings
        if request.user.role == 'LANDLORD' and obj.agent == request.user:
            return True
            
        # Agent can update assigned listings (currently defaults to their own user ID for MVP)
        if request.user.role == 'AGENT' and obj.agent == request.user:
            return True
            
        return False
