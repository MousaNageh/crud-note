from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from user.tests.dataset import test_data




class APILoginTests(TestCase):

    def setUp(self) :
        self.User = get_user_model() 
        self.client = APIClient()
        self.url = reverse('user-login')
    
    
    def test_login_with_valid_credentials(self):
        self.__create_user()
        res = self.client.post(self.url,test_data[0])
        self.assertEqual(res.status_code,status.HTTP_200_OK)

    def test_login_with_invalid_credentials(self):
        self.__create_user()
        res = self.client.post(self.url,test_data[1])
        self.assertEqual(res.status_code,status.HTTP_401_UNAUTHORIZED)
        
    def test_login_with_invalid_password(self):
        self.__create_user()
        res = self.client.post(self.url,{'email':test_data[0]['email'],"password":"foofoo"})
        self.assertEqual(res.status_code,status.HTTP_401_UNAUTHORIZED)
    
    def test_login_with_invalid_email(self):
        self.__create_user()
        res = self.client.post(self.url,{'email':test_data[1]['email'],"password":test_data[0]['password']})
        self.assertEqual(res.status_code,status.HTTP_401_UNAUTHORIZED)

    def __create_user(self):
        self.User.objects.create_user(**test_data[0],is_active=True)

