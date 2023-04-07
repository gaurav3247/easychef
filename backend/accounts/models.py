from django.db import models
from django.contrib.auth.models import User


class UserProfile(User):
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    avatar = models.ImageField(upload_to='accounts/avatars', null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    wizard_shown = models.BooleanField(default=False)