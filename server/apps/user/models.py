from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuidfield import ShortUUIDField

class User(AbstractUser):
	userId = ShortUUIDField()
	image = models.ImageField(upload_to="user")
