import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteNote } from '../../store/actions/notes-actions';

@Component({
  selector: 'app-notes-item',
  templateUrl: './notes-item.component.html',
  styleUrls: ['./notes-item.component.scss'],
})
export class NotesItemComponent implements OnInit {
  @Input("note") note!:Node|any 
  constructor(private store:Store) {}

  ngOnInit(): void {}

  deleteNote(id:string){

    this.store.dispatch(deleteNote({id}))

  }
}
