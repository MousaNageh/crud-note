from abc import ABC, abstractmethod


class NoteAuthorizationAbstract(ABC):
    @abstractmethod
    def test_user_can_get_note_owned_by_anther_user(self):
        pass

    @abstractmethod
    def test_user_can_edit_note_owned_by_anther_user(self):
        pass

    @abstractmethod
    def test_user_can_delete_note_owned_by_anther_user(self):
        pass
