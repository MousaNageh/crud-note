from rest_framework_simplejwt.views import TokenObtainPairView
from user.serializers.user_serializer import LoginSerializer



class LoginView(TokenObtainPairView):
    permission_classes = []
    authentication_classes = []
    serializer_class = LoginSerializer











