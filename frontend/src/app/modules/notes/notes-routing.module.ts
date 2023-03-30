import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { NotesComponent } from './pages/note-list/notes.component';
import { UpdateNoteComponent } from './pages/update-note/update-note.component';
import { NoteResolver } from './resolvers/note.resolver';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    title: 'Notes',
    resolve: {
      products: NoteResolver
    }
  },
  {
    path: 'create-note',
    component: CreateNoteComponent,
    title: 'Notes',
  },
  {
    path: ':id',
    component: UpdateNoteComponent,
    title: 'Update Note',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule { }
