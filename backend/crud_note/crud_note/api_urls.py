
from django.urls import path,include


apis = [
    path('auth/',include('user.urls.user_urls')),
]
