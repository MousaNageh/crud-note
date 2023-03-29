import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { finalize, first, Observable, tap } from 'rxjs';
import { loadNoteList } from '../store/actions/notes-actions';
import { selectNoteLoadList } from '../store/selectors/notes-selectors';


@Injectable({
  providedIn: 'root'
})
export class NoteResolver implements Resolve<any> {
  loading = false ;
  constructor(private store:Store){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(selectNoteLoadList),
      tap(noteListLoaded=>{
        if(!this.loading && !noteListLoaded){
          this.loading =true ;
          this.store.dispatch(loadNoteList())
        }
      }),
      first(),
      finalize(()=>this.loading=false) 
    )
  }
}