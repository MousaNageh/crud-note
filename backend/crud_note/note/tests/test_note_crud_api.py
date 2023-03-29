from note.tests.note_crud_abstract import TestNoteCrudAbstract
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from user.tests.dataset import test_data as user_data
from note.tests.dataset import test_data
import json


class NoteAPITests(TestNoteCrudAbstract,TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(**user_data[0], is_active=True)
        self.client = APIClient()
        self.login_url = reverse('user-login')
        self.list_create_url = reverse('note-api-list')
        self.client.force_authenticate(user=self.user)

    def test_create_note(self):
        self.__data_validation_tests(method=self.client.post, url=self.list_create_url)
        res = self.__create_note()
        response_content = json.loads(res.content)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(test_data[0], {"title": response_content.get(
            "title"), "description": response_content.get("description")})

    def test_update_note(self):
        res = self.__create_note()
        response_content = json.loads(res.content)
        url = self.__get_update_delete_url(id=response_content.get("id"))
        self.__data_validation_tests(method=self.client.put, url=url)
        new_res = self.client.put(url,test_data[1])
        new_respose_content = json.loads(new_res.content)
        self.assertEqual(new_res.status_code, status.HTTP_200_OK)
        self.assertEqual(test_data[1], {"title": new_respose_content.get(
            "title"), "description": new_respose_content.get("description")})
    
    def test_list_of_notes(self):
        for i in range(3):
            self.__create_note(data_test_index=i) 
        res = self.client.get(self.list_create_url)
        response_content = json.loads(res.content) 
        self.assertEqual(3,response_content.get("count"))

    def test_delete_note(self):
        res = self.__create_note()  
        id = json.loads(res.content).get("id")
        url = self.__get_update_delete_url(id=id) 
        delete_res = self.client.delete(url)
        self.assertEqual(delete_res.status_code,status.HTTP_204_NO_CONTENT)

    def __create_note(self, data_test_index=0):
        return self.client.post(self.list_create_url, test_data[data_test_index])

    def __get_update_delete_url(self, id):
        return reverse('note-api-detail', kwargs={"id": id})

    def __data_validation_tests(self, method, url):
        res = method(url, {**test_data[0], "title": ""})
        self.__assert_bad_request(status_code=res.status_code)

        res = method(url, {**test_data[0], "description": ""})
        self.__assert_bad_request(status_code=res.status_code)

        res = method(url, {"title": "", "description": ""})
        self.__assert_bad_request(status_code=res.status_code)

    def __assert_bad_request(self, status_code):
        self.assertEqual(status_code, status.HTTP_400_BAD_REQUEST)
