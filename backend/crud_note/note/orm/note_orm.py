from note.models import Note
from django.shortcuts import get_object_or_404

class NoteOrm:

    def create_note(self,**fields):
        return Note.objects.create(**fields)

    def get_notes_for_user(self,user):
        return Note.objects.filter(user=user).order_by("-created_at")
    
    def get_one_note(self,user,id):
        return get_object_or_404(Note, user=user, id=id) 
    

