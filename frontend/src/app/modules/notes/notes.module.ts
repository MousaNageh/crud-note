import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from 'src/app/shared/shared.module';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { NotesItemComponent } from './components/note-item/notes-item.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './pages/note-list/notes.component';
import { NoteEffects } from './store/effects/notes-effects';
import { NotesReducer, NoteStorName } from './store/reducers/notes-reducers';
import { UpdateNoteComponent } from './pages/update-note/update-note.component';

@NgModule({
  declarations: [NotesComponent, NotesItemComponent, CreateNoteComponent, UpdateNoteComponent],
  imports: [
    CommonModule, 
    NotesRoutingModule,
    SharedModule,
    StoreModule.forFeature(NoteStorName,NotesReducer),
    EffectsModule.forFeature([NoteEffects]),
  ],
})
export class NotesModule {}
