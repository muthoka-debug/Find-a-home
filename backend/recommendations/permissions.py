from rest_framework import permissions

class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated and request.user.role == 'ADMIN'

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Allows access only to the owner of the object or an Admin.
    """
    def has_object_permission(self, request, view, obj):
        # Must be authenticated
        if not request.user or not request.user.is_authenticated:
            return False
            
        if request.user.role == 'ADMIN':
            return True
            
        # Depending on the model, the user field might be different
        if hasattr(obj, 'user'):
            return obj.user == request.user
        elif hasattr(obj, 'listing') and hasattr(obj.listing, 'agent'):
            return obj.listing.agent == request.user
        return False
