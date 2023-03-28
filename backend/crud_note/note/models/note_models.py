from django.contrib.auth import get_user_model
from django.db import models
import uuid 

class Note(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4) 
    user = models.ForeignKey(get_user_model(),related_name="user_notes",db_index=True,on_delete=models.CASCADE) 
    title = models.CharField(max_length=255) 
    description  = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return self.title
    
    def __repr__(self) -> str:
        return  self.title  
    

