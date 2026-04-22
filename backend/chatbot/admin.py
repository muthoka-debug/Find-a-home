from django.contrib import admin
from .models import ChatSession, ChatMessage, ChatIntentEvent

class ChatMessageInline(admin.TabularInline):
    model = ChatMessage
    extra = 0
    readonly_fields = ('sender', 'text', 'intent', 'created_at', 'response_time_ms')

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'started_at', 'last_activity_at')
    inlines = [ChatMessageInline]
    search_fields = ('user__username',)

@admin.register(ChatIntentEvent)
class ChatIntentEventAdmin(admin.ModelAdmin):
    list_display = ('message', 'parsed_county', 'parsed_budget_max', 'parsed_bedrooms')
    list_filter = ('parsed_county', 'parsed_bedrooms')
