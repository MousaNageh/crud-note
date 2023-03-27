from django.urls import path

from user.views.user_view import LoginView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('login/', LoginView.as_view(), name='user-login'),
    path('refresh-token/', jwt_views.TokenRefreshView.as_view(), name='user-refresh-token'),
]
