from django.contrib.auth import get_user_model



class UserOrm:
    def create_user(self,email,password,**extra_fields):
        user  = get_user_model().objects.create(email=email,**extra_fields)
        user.set_password(password)
        user.save()
        return user 
    
    def create_superuser(self,email,password,**extra_fields):
        extra_fields["is_staff"]= True
        extra_fields["is_superuser"] =  True
        extra_fields["is_active"] =  True
        return self.create_user(email,password,**extra_fields)
    
