from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.chat.serializers import ChatRoomSerializer
from apps.chat.models import ChatRoom

class ChatRoomView(APIView):
	def post(self, request):
		serializer = ChatRoomSerializer(
			data=request.data, context={"request": request}
		)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
