import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from '../../interfaces/notes';
import { loadNoteListNext } from '../../store/actions/notes-actions';
import { selectAllNotes, selectNoteListNext, selectNumberOfNotes } from '../../store/selectors/notes-selectors';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes$!:Observable<Note[]>;
  numberOfNotes$!:Observable<number>;
  nextUrl$!:Observable<string|null>;
  
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.notes$ = this.store.select(selectAllNotes);
    this.numberOfNotes$ = this.store.select(selectNumberOfNotes);
    this.nextUrl$ = this.store.select(selectNoteListNext)
  }
  loadMoreNotes(nextUrl:string|null){
    if(nextUrl)
    this.store.dispatch(loadNoteListNext({url:nextUrl}))
  }
  
	

}
