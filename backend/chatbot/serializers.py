from rest_framework import serializers
from .models import ChatSession, ChatMessage, ChatHandoffEvent

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'session', 'sender', 'text', 'intent', 'created_at']

class ChatSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)
    class Meta:
        model = ChatSession
        fields = ['id', 'user', 'started_at', 'last_activity_at', 'messages']
        read_only_fields = ['user', 'messages']
