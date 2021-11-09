from django.urls import re_path
from apps.chat import consumers

websocket_urlpatterns = [
	re_path(
		r'ws/user/chat/(?P<userId>\w+)/$',
		consumers.ChatConsumer.as_asgi()
	),
]
