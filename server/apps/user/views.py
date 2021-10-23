from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from apps.user.models import User
from apps.user.serializers import LoginSerializer, SignupSerializer

class LoginApiView(TokenObtainPairView):
	serializer_class = LoginSerializer

class SignupApiView(CreateAPIView):
	queryset = User.objects.all()
	serializer_class = SignupSerializer
