from rest_framework import serializers
from note.orm import NoteOrm
from note.models import Note


class NoteSerializer(serializers.ModelSerializer):
    created_at =  serializers.DateTimeField(format="%d %B,%Y %H:%M",read_only=True)
    class Meta:
        model = Note
        exclude=("user",)
        read_only_fields = ("id",)
    
    def create(self, validated_data):
        validated_data.update({"user":self.context.get('user')})
        return NoteOrm().create_note(**validated_data)

