from rest_framework.routers import SimpleRouter
from note.views.note_views import NoteAPI
router = SimpleRouter()
router.register("", NoteAPI, basename="note-api")
urlpatterns = router.urls
