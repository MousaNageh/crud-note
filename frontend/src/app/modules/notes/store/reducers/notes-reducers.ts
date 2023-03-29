import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Note } from '../../interfaces/notes';
import { NotesActions } from '../actions/notes-type';

export const NoteStorName="notes"

export interface Notestate extends EntityState<Note> {
  count: number;
  next: string | null;
  previous: string | null;
  loaded: boolean;
  errorMessage: string;
}
export const NotesAdapter: EntityAdapter<Note> = createEntityAdapter<Note>();
export const initState: Notestate = NotesAdapter.getInitialState({
  count: 0,
  next: null,
  previous: null,
  loaded: false,
  errorMessage: '',
});
export const NotesReducer = createReducer(
  initState,
  on(NotesActions.upsertNote, (state, action) =>
    NotesAdapter.upsertOne(action.note, {
      ...state,
      loaded:true
    })
  ),
  on(NotesActions.noteDeleted, (state, action) =>
    NotesAdapter.removeOne(action.id, state)
  ),
  on(NotesActions.upsertNotes, (state, action) =>
    NotesAdapter.upsertMany(action.notes.results, {
      ...state,
      next: action.notes.next,
      previous: action.notes.previous,
      errorMessage: '',
    })
  ),
  on(NotesActions.noteListFail, (state, action) => ({
    ...state,
    loaded: false,
    errorMessage: action.errorMessage,
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  NotesAdapter.getSelectors();
