import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { NotesComponent } from './pages/note-list/notes.component';
import { NoteResolver } from './resolvers/note.resolver';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    title: 'Notes',
    resolve:{
      products:NoteResolver
    }
  },
  {
    path: 'create-note',
    component: CreateNoteComponent,
    title: 'Notes',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
