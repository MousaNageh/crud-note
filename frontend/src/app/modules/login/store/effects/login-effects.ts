import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, take, tap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { LogInResponse } from '../../interfaces/login';
import { LoginActions } from '../actions/login-type';

@Injectable()
export class AuthEffects {
  logInEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.logIn),
      exhaustMap((data) => {
        const user = {
          ...data.payload,
          email: data.payload.email.toLowerCase(),
        };

        return this.AuthServices.post('api/auth/login/', user).pipe(
          catchError((error) => of({ error }))
        );
      }),
      tap((res) => {
        if (!res.error) this.router.navigate(['/']);
      }),
      map((res) => {
        if (!res.error) {
          return LoginActions.logInSuccess(res);
        } else {
          let errorMessage;
          if (res.error.status === 401) {
            errorMessage = 'Email Or Password is incorrect';
          }
          return LoginActions.AuthFail({ error: errorMessage });
        }
      })
    )
  );
  logInSuccessEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.logInSuccess),
        tap((res: LogInResponse) => {
          this.localStorage.setLocal('token', res.access);
          this.localStorage.setLocal('refresh', res.refresh);
        })
      ),
    { dispatch: false }
  );
  updateTokenEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.updateToken),
        tap((res) => {
          this.localStorage.setLocal('refresh', res.access);
        })
      ),
    { dispatch: false }
  );
  autoLoginEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        take(1),
        tap(() => {
          let access = this.localStorage.getLocal('token');
          let refresh = this.localStorage.getLocal('refresh');
          if (access && refresh) {
            this.store.dispatch(LoginActions.logInSuccess({ access, refresh }));
          }
        })
      ),
    { dispatch: false }
  );
  logOutEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.logout),
        tap(() => {
          this.localStorage.removeAllLocals();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private AuthServices: HttpService,
    private localStorage: LocalStorageService,
    private router: Router,
    private store: Store
  ) {}
}
