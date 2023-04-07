from django.contrib.auth.models import User
from django.db import models
from accounts.models import UserProfile


class EntityBase(models.Model):
    id = models.AutoField(primary_key=True)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class EntityOwner(models.Model):
    user = models.ForeignKey(to=UserProfile, on_delete=models.CASCADE)

    class Meta:
        abstract = True
