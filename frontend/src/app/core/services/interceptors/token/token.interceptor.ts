import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  empty,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { LoginActions } from 'src/app/modules/login/store/actions/login-type';
import { HttpService } from '../../http/http.service';
import { LocalStorageService } from '../../local-storage/local-storage.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private localStorage: LocalStorageService,
    private httpService: HttpService,
    private route: Router,
    private store: Store
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = request.clone({
      headers: new HttpHeaders({
        Authorization: this.localStorage.getLocal('token')
          ? `Bearer ${this.localStorage.getLocal('token')}`
          : '',
      }),
    });
    // return next.handle(token);
    return next.handle(token).pipe(
      catchError((error: any) => {
        if (error.url.includes('/user/refresh')) {
          // this.httpService.logoutSubj.next(true);
          this.route.navigate(['/']);
          return throwError(error);
        }

        if (
          error.status === 401 &&
          (error.error.code === 'token_not_valid' ||
            error.error.code === 'user_not_found')
        ) {
          if (error.error.code === 'user_not_found') {
            this.logOut();
            window.location.href = '/';
          }
          return this.reAuthenticate(error, token).pipe(
            switchMap(() => {
              const token = request.clone({
                headers: new HttpHeaders({
                  Authorization: this.localStorage.getLocal('token')
                    ? `Bearer ${this.localStorage.getLocal('token')}`
                    : '',
                }),
              });
              return next.handle(token);
            })
          );
        }

        return throwError(error);
      })
    );
  }
  reAuthenticate(error: any, langReq: any): Observable<any> {
    const refresh = this.localStorage.getLocal('refresh');
    if (
      this.localStorage.getLocal('token') !==
      langReq.headers.headers.get('authorization')[0].split(' ')[1]
    ) {
      return empty();
    }
    return this.httpService
      .postWithOutLoading('api/auth/refresh/', { refresh })
      .pipe(
        tap((res) => {
          // localStorage.setItem('token', res.access);
          this.store.dispatch(LoginActions.updateToken({ access: res.access }));
        }),
        catchError((error) => {
          this.logOut();
          window.location.href = '/';
          return throwError(error);
        })
      );
  }
  private logOut() {
    this.store.dispatch(LoginActions.logout());
  }
}
