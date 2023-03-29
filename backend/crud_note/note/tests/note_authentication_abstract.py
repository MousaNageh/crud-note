from abc import ABC, abstractmethod


class NoteAuthenticationAbstract(ABC):
    
    @abstractmethod
    def test_user_can_create_note_without_login(self):
        pass

    @abstractmethod
    def test_user_can_update_note_without_login(self):
        pass

    @abstractmethod
    def test_user_can_delete_note_without_login(self):
        pass

    @abstractmethod
    def test_user_can_get_note_without_login(self):
        pass
