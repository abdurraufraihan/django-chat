from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuidfield import ShortUUIDField

class User(AbstractUser):
	userId = ShortUUIDField()
	image = models.ImageField(upload_to="user")

class OnlineUser(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)

	def __str__(self):
		return self.user.username
