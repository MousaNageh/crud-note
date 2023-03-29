from abc import ABC,abstractmethod 

class TestNoteCrudAbstract(ABC):
    
    @abstractmethod
    def test_create_note(self):
        pass 
    
    @abstractmethod
    def test_update_note(self):
        pass 

    @abstractmethod
    def test_delete_note(self):
        pass 

    @abstractmethod
    def test_list_of_notes(self):
        pass 