from django.conf.urls.static import static
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.views import RegisterUserAPIView, LogoutView, EditProfileView, ChangePasswordView, ProfileView

urlpatterns = [
  path('signup/', RegisterUserAPIView.as_view()),
  path('logout/', LogoutView.as_view()),
  path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('edit-profile/', EditProfileView.as_view()),
  path('details/<int:id>/', ProfileView.as_view()),
  path('change-password/', ChangePasswordView.as_view()),
] + static('avatars/', document_root='accounts/avatars')