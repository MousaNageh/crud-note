from django.contrib.auth import get_user_model as user
from django.core.management.base import BaseCommand, CommandError
from error_logger import ErrorLogger
class Command(BaseCommand):
    def handle(self, *args, **options):
        try :
            created_user,created = user().objects.get_or_create(
                email='admin@admin.com',
                is_staff=True,
                is_superuser=True,
                is_active=True
            )
            if created:
                created_user.set_password('123456789')
                created_user.save()
        except Exception as e:
            ErrorLogger().write_error_to_file(str(e))
            raise CommandError(e)