from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny
from apps.user.models import User
from apps.user.serializers import (
	UserSerializer, LoginSerializer, SignupSerializer
)

class UserView(ListAPIView):
	queryset = User.objects.all().order_by('first_name')
	serializer_class = UserSerializer
	pagination_class = LimitOffsetPagination

	def get_queryset(self):
		excludeUsersArr = []
		try:
			excludeUsers = self.request.query_params.get('exclude')
			if excludeUsers:
				userIds = excludeUsers.split(',')
				for userId in userIds:
					excludeUsersArr.append(int(userId))
		except:
			return []
		return super().get_queryset().exclude(id__in=excludeUsersArr)

class LoginApiView(TokenObtainPairView):
	permission_classes = [AllowAny]
	serializer_class = LoginSerializer

class SignupApiView(CreateAPIView):
	permission_classes = [AllowAny]
	queryset = User.objects.all()
	serializer_class = SignupSerializer
