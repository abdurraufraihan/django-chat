from django.contrib import admin
from apps.user.models import User, OnlineUser

admin.site.register(User)
admin.site.register(OnlineUser)
