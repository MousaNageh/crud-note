from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from user.tests.dataset import test_data as user_data
from note.tests.dataset import test_data 
import json 
from note.tests.note_authorization_abstract import NoteAuthorizationAbstract
from rest_framework import status
from note.models import Note 

class TestNoteAuthorization(NoteAuthorizationAbstract, TestCase):
    def setUp(self):
        User = get_user_model()
        self.user1 = User.objects.create(**user_data[0], is_active=True)
        self.user2 = User.objects.create(**user_data[1], is_active=True)
        self.client = APIClient()
        self.list_create_url = reverse("note-api-list")
        self.client.force_authenticate(user=self.user2)

    def test_user_can_get_note_owned_by_anther_user(self):
        node = self.__create_note() 
        
        res = self.client.get(self.list_create_url)
        self.assertEqual(json.loads(res.content).get("count"),0)
        
        get_one_note_url = self.__get_delete_update_url(id=node.id)
        res = self.client.get(get_one_note_url)
        self.assertEqual(res.status_code,status.HTTP_404_NOT_FOUND)

    def test_user_can_edit_note_owned_by_anther_user(self):
        node = self.__create_note() 
        get_one_note_url = self.__get_delete_update_url(id=node.id)
        res = self.client.put(get_one_note_url)
        self.assertEqual(res.status_code,status.HTTP_404_NOT_FOUND)

    def test_user_can_delete_note_owned_by_anther_user(self):
        node = self.__create_note() 
        get_one_note_url = self.__get_delete_update_url(id=node.id)
        res = self.client.delete(get_one_note_url)
        self.assertEqual(res.status_code,status.HTTP_404_NOT_FOUND)

    def __get_delete_update_url(self, id):
        return reverse("note-api-detail", kwargs={"id": id})

    def __create_note(self, data_test_index=0):
        return Note.objects.create(user=self.user1,**test_data[data_test_index])
