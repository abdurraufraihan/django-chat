from django.contrib import admin
from apps.chat.models import ChatRoom, ChatMessage

admin.site.register(ChatRoom)
admin.site.register(ChatMessage)
