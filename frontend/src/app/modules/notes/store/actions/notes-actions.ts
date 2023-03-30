import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Note, NotePayload, NoteList } from '../../interfaces/notes';

export const upsertNote = createAction(
  '[Notes effect ] Upsert Note',
  props<{ note: Note }>()
);
export const upsertNotes = createAction(
  '[Notes effect ] Upsert Notes',
  props<{ notes: NoteList }>()
);
export const loadNoteList = createAction('[Note effect] load Note list');

export const noteListLoaded = createAction(
  '[Note effect] Note list Loaded',
  props<{ NoteList: NoteList | null }>()
);
export const loadNoteListNext = createAction('[Note effect] load next list of notes',
  props<{ url: string }>()
);

export const createOrUpdateNote = createAction(
  '[Note effect] create or update note',
  props<{ payload: NotePayload, action: 'create' | 'update', id: string | null }>()
);

export const getOneNote = createAction(
  '[Note effect] get one note',
  props<{ id: string }>()
);

export const noteCreatedOrUpdated = createAction(
  '[Note effect]note has been created or updated',
  props<{ response: Note, action: 'create' | 'update' }>()
);

export const deleteNote = createAction(
  '[Note effect] Note delete',
  props<{ id: string }>()
);

export const noteDeleted = createAction(
  '[Note effect] note had been deleted',
  props<{ id: string }>()
);
export const noteListFail = createAction(
  '[Note effect] Note list  fail',
  props<{ errorMessage: string }>()
);
