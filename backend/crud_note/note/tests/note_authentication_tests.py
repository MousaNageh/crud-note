from django.test import TestCase
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.test import APIClient
from django.urls import reverse
import  uuid


from note.tests.note_authentication_abstract import NoteAuthenticationAbstract


class TestNoteAuthentication(NoteAuthenticationAbstract, TestCase):
    def setUp(self):
        self.client = APIClient()
        self.get_create_url = reverse('note-api-list')
        self.update_delete_url = reverse('note-api-detail',kwargs={"id":str(uuid.uuid4())})

    def test_user_can_create_note_without_login(self):
        res = self.client.post(self.get_create_url,{})
        self.__test_authentication(res_status=res.status_code)

    def test_user_can_update_note_without_login(self):
        res = self.client.put(self.update_delete_url, {})
        self.__test_authentication(res_status=res.status_code)

    def test_user_can_delete_note_without_login(self):
        res = self.client.delete(self.update_delete_url, {})
        self.__test_authentication(res_status=res.status_code)

    def test_user_can_get_note_without_login(self):
        res = self.client.post(self.get_create_url, {})
        self.__test_authentication(res_status=res.status_code)

    def __test_authentication(self,res_status):
        self.assertEqual(res_status, HTTP_401_UNAUTHORIZED)