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


class ProfileView(RetrieveAPIView):
    serializer_class = UpdateUserSerializer

    def get_object(self):
        return get_object_or_404(UserProfile, id=self.kwargs['id'])


class ChangePasswordView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return get_object_or_404(UserProfile, id=self.request.user.id)
