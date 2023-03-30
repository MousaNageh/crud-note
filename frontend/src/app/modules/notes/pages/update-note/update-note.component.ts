import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Note, NotePayload } from '../../interfaces/notes';
import { createOrUpdateNote, getOneNote } from '../../store/actions/notes-actions';
import { selectErrorOfNote, selectOneNote } from '../../store/selectors/notes-selectors';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {
  noteForm!: FormGroup;
  errorMessage$!: Observable<string>;
  note$!: Observable<Note>;
  errorMessages = {
    title: {
      required: 'Title is required',
    },
    description: {
      required: 'description is required',
    },
  };
  constructor(private formBuilder: FormBuilder, private store: Store, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.note$ = this.store.select(selectOneNote(params['id'])).pipe(tap(note => {
        if (note)
          this.noteForm.setValue({ title: note.title, description: note.description })
        else
          this.store.dispatch(getOneNote({ id: params['id'] }))
      }))
    })
    this.initNoteForm();
    this.errorMessage$ = this.store.select(selectErrorOfNote);
  }
  initNoteForm(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  formControlData(formControl: any): FormControl {
    return this.noteForm.get(formControl) as FormControl;
  }
  updateNote(id: string): void {
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }
    let payload: NotePayload = (this.noteForm.value) as NotePayload
    this.store.dispatch(createOrUpdateNote({ payload, action: 'update', id }));
  }

}
