from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer, LoginSerializer
from .models import User

class CustomRegisterSerializer(RegisterSerializer):
    role = serializers.ChoiceField(choices=User.Role.choices, default=User.Role.HOUSE_HUNTER)
    phone_number = serializers.CharField(max_length=15, required=False, allow_blank=True)
    whatsapp_number = serializers.CharField(max_length=15, required=False, allow_blank=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['role'] = self.validated_data.get('role', User.Role.HOUSE_HUNTER)
        data['phone_number'] = self.validated_data.get('phone_number', '')
        data['whatsapp_number'] = self.validated_data.get('whatsapp_number', '')
        return data

    def save(self, request):
        user = super().save(request)
        user.role = self.cleaned_data.get('role')
        user.phone_number = self.cleaned_data.get('phone_number')
        user.whatsapp_number = self.cleaned_data.get('whatsapp_number')
        
        # House hunters are auto-verified, Landlords/Agents need admin approval
        if user.role == User.Role.HOUSE_HUNTER:
            user.is_verified = True
        else:
            user.is_verified = False
            
        user.save(update_fields=['role', 'phone_number', 'whatsapp_number', 'is_verified'])
        return user

class CustomLoginSerializer(LoginSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        
        # Block login if agent or landlord is unverified
        if user.role in [User.Role.LANDLORD, User.Role.AGENT] and not user.is_verified:
            raise serializers.ValidationError(
                "Your account is pending admin verification. You will be able to log in once approved."
            )
            
        return data

class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        model = User
        fields = UserDetailsSerializer.Meta.fields + ('role', 'phone_number', 'whatsapp_number', 'is_verified')
