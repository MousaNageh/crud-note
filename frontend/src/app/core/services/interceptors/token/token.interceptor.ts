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
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestToSend = request.clone({
      headers: new HttpHeaders({
        Authorization: this.localStorage.getLocal('token')
          ? `Bearer ${this.localStorage.getLocal('token')}`
          : '',
      }),
    });
    return next.handle(requestToSend).pipe(
      catchError((error: any) => {
        if (error.status === 401 && error.error.code === 'token_not_valid' && !error.url.includes("auth/refresh-token")) {
          return this.reAuthenticate(error, requestToSend).pipe(
            switchMap(() => {
              const newRequest = request.clone({
                headers: new HttpHeaders({
                  Authorization: this.localStorage.getLocal('token')
                    ? `Bearer ${this.localStorage.getLocal('token')}`
                    : '',
                }),
              });
              return next.handle(newRequest);
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
      .postWithOutLoading('api/auth/refresh-token/', { refresh })
      .pipe(
        tap((res) => {
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
