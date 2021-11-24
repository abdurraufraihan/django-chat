import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from apps.chat.models import ChatRoom, ChatMessage
from apps.user.models import User

class ChatConsumer(AsyncWebsocketConsumer):
	def saveMessage(self, message, userId, roomId):
		userObj = User.objects.get(id=userId)
		chatObj = ChatRoom.objects.get(roomId=roomId)
		chatMessageObj = ChatMessage.objects.create(
			chat=chatObj, user=userObj, message=message
		)
		return {
			'action': 'message',
			'user': userId,
			'roomId': roomId,
			'message': message,
			'userImage': userObj.image.url,
			'userName': userObj.first_name + " " + userObj.last_name,
			'timestamp': str(chatMessageObj.timestamp)
		}

	async def connect(self):
		self.userId = self.scope['url_route']['kwargs']['userId']
		self.userRooms = await database_sync_to_async(
			list
		)(ChatRoom.objects.filter(member=self.userId))
		for room in self.userRooms:
			await self.channel_layer.group_add(
				room.roomId,
				self.channel_name
			)
		await self.accept()

	async def disconnect(self, close_code):
		for room in self.userRooms:
			await self.channel_layer.group_discard(
				room.roomId,
				self.channel_name
			)

	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		action = text_data_json['action']
		roomId = text_data_json['roomId']
		chatMessage = {}
		if action == 'message':
			message = text_data_json['message']
			userId = text_data_json['user']
			chatMessage = await database_sync_to_async(
				self.saveMessage
			)(message, userId, roomId)
		elif action == 'typing':
			chatMessage = text_data_json
		await self.channel_layer.group_send(
			roomId,
			{
				'type': 'chat_message',
				'message': chatMessage
			}
		)

	async def chat_message(self, event):
		message = event['message']
		await self.send(text_data=json.dumps(message))
