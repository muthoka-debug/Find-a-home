from django.db import models
from django.conf import settings

class ChatSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='chat_sessions')
    started_at = models.DateTimeField(auto_now_add=True)
    last_activity_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Session {self.id} for {self.user.username}"

class ChatMessage(models.Model):
    class SenderRole(models.TextChoices):
        USER = 'USER', 'User'
        BOT = 'BOT', 'Bot'

    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=10, choices=SenderRole.choices)
    text = models.TextField()
    intent = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    response_time_ms = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.sender}: {self.text[:20]}..."

class ChatIntentEvent(models.Model):
    message = models.OneToOneField(ChatMessage, on_delete=models.CASCADE, related_name='intent_event')
    parsed_county = models.CharField(max_length=100, blank=True, null=True)
    parsed_budget_max = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    parsed_bedrooms = models.PositiveIntegerField(blank=True, null=True)
    parsed_amenities = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Intent Details for Message {self.message.id}"

class ChatHandoffEvent(models.Model):
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='handoffs')
    reason = models.CharField(max_length=255)
    escalated_at = models.DateTimeField(auto_now_add=True)
    escalated_to_human = models.BooleanField(default=True)

    def __str__(self):
        return f"Handoff for Session {self.session.id}: {self.reason}"
