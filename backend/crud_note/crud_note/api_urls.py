
from django.urls import path,include


apis = [
    path('auth/',include('user.urls.user_urls')),
    path('note/',include('note.urls.note_urls')),
]
