from django.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser
from user.manager.user_manager import UserManager





class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    email = models.EmailField(max_length=255, unique=True, db_index=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    class Meta:
        verbose_name = "Accounts"
        verbose_name_plural = "Accounts"
    
    def __str__(self) -> str:
        return  self.email
    
    def __repr__(self) -> str:
        return  self.email  


