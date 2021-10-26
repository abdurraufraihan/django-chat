from django.urls import path
from apps.chat.views import ChatRoomView

urlpatterns = [
	path('chat', ChatRoomView.as_view(), name='chatRoom'),
]
