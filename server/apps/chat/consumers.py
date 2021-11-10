import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from apps.chat.models import ChatRoom

class ChatConsumer(AsyncWebsocketConsumer):
	def getChatRoomsOfUser(self, userId):
		return ChatRoom.objects.filter(member=userId)

	async def connect(self):
		self.userId = self.scope['url_route']['kwargs']['userId']
		userRooms = await database_sync_to_async(
			self.getChatRoomsOfUser
		)(self.userId)
		for room in userRooms:
			await self.channel_layer.group_add(
				room.roomId,
				self.channel_name
			)
		await self.accept()

	async def disconnect(self, close_code):
		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)

	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		message = text_data_json['message']
		await self.channel_layer.group_send(
			self.room_group_name,
			{
				'type': 'chat_message',
				'message': message
			}
		)

	async def chat_message(self, event):
		message = event['message']
		await self.send(text_data=json.dumps({
			'message': message
		}))
