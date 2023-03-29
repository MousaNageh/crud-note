import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
// import { loadServices } from '../store/actions/services-actions';
// import { getservicesLoaded } from '../store/selectors/services-selectors';

@Injectable({
  providedIn: 'root',
})
export class ServiesResolver implements Resolve<boolean> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  // laoding: Boolean = false;
  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> {
  //   return this.store.pipe(
  //     select(getservicesLoaded),
  //     tap((loading) => {
  //       if (!this.laoding && !loading) this.store.dispatch(loadServices());
  //     }),
  //     first(),
  //     finalize(() => {
  //       this.laoding = false;
  //     })
  //   );
  // }
  // constructor(private store: Store) {}
}
