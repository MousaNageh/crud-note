import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Note, NoteList } from '../../interfaces/notes';
import { NotesActions } from '../actions/notes-type';

@Injectable()
export class NoteEffects {

  createOrUpdateNoteEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.createOrUpdateNote),
      exhaustMap((payload) => {
        if (payload.action == 'create') {
          return this.httpService
            .post<Note>('api/note/', payload.payload)
            .pipe(catchError((error) => of({ error })))
        }
        return this.httpService
          .put<Note>(`api/note/${payload.id}/`, payload.payload)
          .pipe(catchError((error) => of({ error })))
      }
      ),
      tap((res) => {
        if (!('error' in res)) this.router.navigate(['notes']);
      }),
      map((res: Note) => {
        if (res && 'error' in res) {
          return NotesActions.noteListFail({
            errorMessage: 'somthing wrong',
          });
        }
        return NotesActions.upsertNote({ note: res });
      })
    )
  );

  NotesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.loadNoteList),
      exhaustMap(() => this.httpService.get<NoteList>('api/note/')),
      map((notes: NoteList) => NotesActions.upsertNotes({ notes }))
    )
  );
  NoteGetOneEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.getOneNote),
      exhaustMap((payload) => this.httpService.get<Note>(`api/note/${payload.id}/`)),
      map((note: Note) => NotesActions.upsertNote({ note }))
    )
  );

  NoteGetNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.loadNoteListNext), exhaustMap((payload) => this.httpService.get<NoteList>(payload.url)),
      map((notes: NoteList) => NotesActions.upsertNotes({ notes }))
    )
  );

  deleteEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNote),
      exhaustMap((payload) =>
        this.httpService
          .deleteReq<{ id: string }>(`api/note/${payload.id}/`,)
          .pipe(
            catchError((error) => of({ error })),
            map(() => ({ id: payload.id }))
          )
      ),
      map((res) => {
        if (res && 'error' in res) {
          return NotesActions.noteListFail({
            errorMessage: 'somthing wrong',
          });
        }
        return NotesActions.noteDeleted({ id: res.id });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private httpService: HttpService,
    private store: Store,
    private router: Router
  ) { }
}
