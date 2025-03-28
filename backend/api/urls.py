from django.urls import path
from .views import *

urlpatterns = [
    path('users', top_users),
]