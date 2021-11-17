from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from apps.user.models import User
from apps.chat.models import ChatRoom

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'image', 'first_name', 'last_name']

class LoginSerializer(TokenObtainPairSerializer):
	@classmethod
	def get_token(cls, user):
		token = super().get_token(user)
		token['userId'] = user.id
		return token

class SignupSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(
		required=True,
		validators=[UniqueValidator(queryset=User.objects.all())]
	)
	password = serializers.CharField(
		write_only=True, required=True, validators=[validate_password]
	)
	passwordTwo = serializers.CharField(write_only=True, required=True)

	class Meta:
		model = User
		fields = (
			'first_name', 'last_name', 'image', 'email', 'password', 'passwordTwo'
		)
		extra_kwargs = {
			'first_name': {'required': True},
			'last_name': {'required': True},
			'email': {'required': True},
			'password': {'required': True},
		}

	def validate(self, attrs):
		if attrs['password'] != attrs['passwordTwo']:
			raise serializers.ValidationError(
				{"password": "Password fields didn't match."}
			)
		return attrs

	@transaction.atomic
	def create(self, validated_data):
		user = User.objects.create(
			username=validated_data['email'],
			email=validated_data['email'],
			first_name=validated_data['first_name'],
			last_name=validated_data['last_name'],
			image=validated_data['image']
		)
		user.set_password(validated_data['password'])
		user.save()
		chatRoom = ChatRoom.objects.create(
			type="SELF", name=user.first_name + user.last_name
		)
		chatRoom.member.add(user.id)
		return user
