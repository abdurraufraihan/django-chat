from rest_framework import serializers
from apps.chat.models import ChatRoom, ChatMessage
from apps.user.serializers import UserSerializer

class ChatRoomSerializer(serializers.ModelSerializer):
	member = UserSerializer(many=True, read_only=True)
	members = serializers.ListField(write_only=True)

	def create(self, validatedData):
		memberObject = validatedData.pop('members')
		chatRoom = ChatRoom.objects.create(**validatedData)
		chatRoom.member.set(memberObject)
		return chatRoom

	class Meta:
		model = ChatRoom
		exclude = ['id']

class ChatMessageSerializer(serializers.ModelSerializer):
	userName = serializers.SerializerMethodField()
	userImage = serializers.ImageField(source='user.image')

	class Meta:
		model = ChatMessage
		exclude = ['id', 'chat']

	def get_userName(self, Obj):
		return Obj.user.first_name + ' ' + Obj.user.last_name
