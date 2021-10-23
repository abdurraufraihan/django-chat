from rest_framework.generics import CreateAPIView
from apps.user.models import User
from apps.user.serializers import SignupSerializer

class SignupView(CreateAPIView):
	queryset = User.objects.all()
	serializer_class = SignupSerializer
