import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotePayload } from '../../interfaces/notes';
import { createOrUpdateNote } from '../../store/actions/notes-actions';
import { selectErrorOfNote } from '../../store/selectors/notes-selectors';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {
  noteForm!: FormGroup;
  errorMessage$!: Observable<string>;
  errorMessages = {
    title: {
      required: 'Title is required',
    },
    description: {
      required: 'description is required',
    },
  };
  constructor(private formBuilder: FormBuilder, private store: Store) {}
  ngOnInit(): void {
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
  createNote(): void {
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }
    let payload:NotePayload = (this.noteForm.value) as NotePayload
    this.store.dispatch(createOrUpdateNote({payload,action:'create',id:null }));
  }
}
