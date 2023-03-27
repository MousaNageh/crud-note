from django.contrib.auth.models import  BaseUserManager
from user.orm.user_orm import UserOrm 
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    orm = UserOrm()
    def create_user(self, email, password, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError(_("The Email must be set"))
        
        if not password:
            raise ValueError(_("The Password must be set"))

        email = self.normalize_email(email)
        return self.orm.create_user(email=email,password=password,**extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Creates and saves a new superuser"""
        return self.orm.create_superuser(email=email,password=password,**extra_fields)