from django.contrib.auth import get_user_model
from django.test import TestCase
from user.tests.dataset import test_data 

class UsersCreateTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(**test_data[0],is_active=True)
        self.assertEqual(user.email, test_data[0]['email'])
        self.assertTrue(user.check_password(test_data[0]['password']))
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email="")
        with self.assertRaises(ValueError):
            User.objects.create_user(email="",password="")
        with self.assertRaises(ValueError):
            User.objects.create_user(email="", password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(**test_data[0])
        self.assertEqual(admin_user.email, test_data[0]['email'])
        self.assertTrue(admin_user.check_password(test_data[0]['password']))
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email="")
        with self.assertRaises(ValueError):
            User.objects.create_user(email="",password="")
        with self.assertRaises(ValueError):
            User.objects.create_user(email="", password="foo")