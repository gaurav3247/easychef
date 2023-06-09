import random

from django.core.files.base import ContentFile
import base64
from django.core.files.base import ContentFile
from rest_framework import status
from accounts.models import UserProfile
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView
from .serializers import RegisterSerializer, UpdateUserSerializer, ChangePasswordSerializer

#credit to Emre Cevik https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5


class RegisterUserAPIView(CreateAPIView):
    serializer_class = RegisterSerializer


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class EditProfileView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserSerializer

    def get_object(self):
        return get_object_or_404(UserProfile, id=self.request.user.id)

    def get(self, request, *args, **kwargs):
        user = UserProfile.objects.get(id=self.request.user.id)

        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        user = UserProfile.objects.get(id=self.request.user.id)

        image_data = request.data.get('avatar', None)
        if(image_data):
            format, imgstr = image_data.split(';base64,')
            print("format", format)
            ext = format.split('/')[-1]

            data = ContentFile(base64.b64decode(imgstr))
            data.name = f"{user.id}_{random.randint(0,100000)}_avatar_picture.png"
            request.data["avatar"] = data

        serializer = self.serializer_class(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileView(RetrieveAPIView):
    serializer_class = UpdateUserSerializer

    def get_object(self):
        return get_object_or_404(UserProfile, id=self.kwargs['id'])


class ChangePasswordView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return get_object_or_404(UserProfile, id=self.request.user.id)
