import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from '../../interfaces/notes';
import { Notestate, NoteStorName, selectEntities } from '../reducers/notes-reducers';
// select the dictionary of user entities
export const selectNotesState = createFeatureSelector<Notestate>(NoteStorName);
export const selectNotesEntities = createSelector(
  selectNotesState,
  selectEntities
);
export const selectNoteListNext = createSelector(
  selectNotesState,
  (noteListState): string | null => noteListState.next
);
export const selectNoteLoadList = createSelector(
  selectNotesState,
  (noteListState): boolean => noteListState.loaded
);
export const selectAllNotes = createSelector(
  selectNotesState,
  (noteListState): Note[] => (Object.values(noteListState.entities)) as Note[]
);

export const selectNumberOfNotes = createSelector(
  selectNotesState,
  (noteListState): number => Object.keys(noteListState.entities).length
);
export const selectOneNote = (id: string) => createSelector(
  selectNotesState,
  (noteListState): Note => noteListState.entities[id] as Note
);

export const selectErrorOfNote = createSelector(
  selectNotesState,
  (noteListState): string => noteListState.errorMessage
);


