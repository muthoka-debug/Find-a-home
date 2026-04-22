import re
import time
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import ChatSession, ChatMessage, ChatIntentEvent
from .serializers import ChatSessionSerializer, ChatMessageSerializer

class ChatSessionViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return ChatSession.objects.all().order_by('-last_activity_at')
        return ChatSession.objects.filter(user=self.request.user).order_by('-last_activity_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        session = self.get_object()
        user_text = request.data.get('text', '').strip()
        if not user_text:
            return Response({"error": "Message text is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        start_time = time.time()
        
        user_msg = ChatMessage.objects.create(
            session=session, sender=ChatMessage.SenderRole.USER, text=user_text
        )

        intent = self._detect_intent(user_text)
        extracted = self._extract_entities(user_text)

        if any(extracted.values()):
            ChatIntentEvent.objects.create(
                message=user_msg,
                parsed_county=extracted.get('county'),
                parsed_budget_max=extracted.get('budget'),
                parsed_bedrooms=extracted.get('bedrooms')
            )

        bot_response_text = self._generate_response(request.user.role, intent, extracted, user_text)
        response_time_ms = int((time.time() - start_time) * 1000)

        bot_msg = ChatMessage.objects.create(
            session=session, sender=ChatMessage.SenderRole.BOT, text=bot_response_text,
            intent=intent, response_time_ms=response_time_ms
        )

        session.last_activity_at = timezone.now()
        session.save()
        
        return Response(ChatMessageSerializer(bot_msg).data, status=status.HTTP_200_OK)

    def _detect_intent(self, text):
        t = text.lower()
        if "help" in t or "support" in t: return "help"
        if "report" in t or "fake" in t or "scam" in t: return "report_fraud"
        if "verify" in t or "verified" in t: return "verification_faq"
        if "find" in t or "search" in t or "looking for" in t or "rent" in t: return "search_property"
        if "whatsapp" in t or "contact" in t: return "contact_agent"
        return "general_faq"

    def _extract_entities(self, text):
        t = text.lower()
        extracted = {"county": None, "budget": None, "bedrooms": None}
        for county in ["nairobi", "kiambu", "machakos", "mombasa", "nakuru", "kajiado"]:
            if county in t: extracted["county"] = county.title()
        
        budget_match = re.search(r'(?:under|budget|max|below).{0,10}?(\d{1,3})(?:k|,?\d{3}|000)', t)
        if budget_match:
            val = budget_match.group(1)
            val_int = int(val)
            if val_int < 1000: val_int *= 1000
            extracted["budget"] = val_int

        bed_match = re.search(r'(\d+)\s*(?:bed|br|bedroom)', t)
        if bed_match:
            extracted["bedrooms"] = int(bed_match.group(1))

        return extracted

    def _generate_response(self, role, intent, extracted, raw_text):
        if intent == "search_property":
            parts = []
            if extracted['bedrooms']: parts.append(f"{extracted['bedrooms']}-bedroom")
            if extracted['county']: parts.append(f"in {extracted['county']}")
            if extracted['budget']: parts.append(f"under Ksh {extracted['budget']:,}")
            
            search_summary = " ".join(parts) if parts else "a property"
            return f"I can help you find {search_summary}. Head over to the Search page and I'll pre-fill these filters for you!"

        if intent == "report_fraud":
            if role in ['AGENT', 'LANDLORD']:
                return "If someone copied your listing, click the 'Report' button on their listing page. Our admins review these daily."
            return "Safety is our priority. Please use the 'Report' button on any suspicious listing and our Admin team will investigate immediately."

        if intent == "verification_faq":
            if role == 'HOUSE_HUNTER':
                return "All listings on FindAHome are manually verified by our team. Look for the blue 'Verified' badge!"
            return "As an Agent/Landlord, your account requires Admin approval before your listings go public. This usually takes 24 hours."

        if intent == "contact_agent":
            return "You can contact verified agents directly! Just click the 'Chat on WhatsApp' button on any listing page."
            
        return "I'm the FindAHome assistant! I can help you search for verified houses, explain the verification process, or guide you on how to contact agents."
