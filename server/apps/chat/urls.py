from django.urls import path
from apps.chat.views import ChatRoomView

urlpatterns = [
	path('chats', ChatRoomView.as_view(), name='chatRoom'),
	path('users/<int:userId>/chats', ChatRoomView.as_view(), name='chatRoomList'),
]
