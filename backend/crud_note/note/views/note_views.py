from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from note.serializers.note_serializers import NoteSerializer
from note.orm import NoteOrm

class NoteAPI(ModelViewSet):
    permission_classes = [IsAuthenticated, ]
    serializer_class = NoteSerializer
    lookup_field = 'id'
    orm = NoteOrm()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'user': self.request.user})
        return context
    
    def get_queryset(self):
        return self.orm.get_notes_for_user(user=self.request.user)
    

    def get_object(self):
        return self.orm.get_one_note(user=self.request.user,id=self.kwargs.get('id'))




