from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        LANDLORD = "LANDLORD", "Landlord"
        AGENT = "AGENT", "Agent"
        HOUSE_HUNTER = "HOUSE_HUNTER", "House Hunter"

    role = models.CharField(
        max_length=50, 
        choices=Role.choices, 
        default=Role.HOUSE_HUNTER
    )
    
    # Common fields for Kenya context
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    whatsapp_number = models.CharField(max_length=15, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.pk:
            if self.role == self.Role.ADMIN:
                self.is_staff = True
                self.is_superuser = True
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.role})"
