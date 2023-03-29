import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  get<T = any>(url: string, params = {}, showLoader = true): Observable<T> {
    if (showLoader) {
      this.loaderService.startLoader();
    }
    url = url.includes(this.baseUrl)? url :this.baseUrl + url

    return this.http.get<T>(url, { params }).pipe(
      map((response: T) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showLoader);
        return throwError(error);
      })
    );
  }

  post<T = any>(url: string, body = {}, showLoader = true): Observable<any> {
    if (showLoader) {
      this.loaderService.startLoader();
    }

    return this.http.post<T>(this.baseUrl + url, body).pipe(
      tap((response: T) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
      }),
      catchError((error) => {
        this.loaderService.stopLoader();
        return throwError(error);
      })
    );
  }
  put<T = any>(url: string, body = {}, showLoader = true): Observable<any> {
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.put<T>(this.baseUrl + url, body).pipe(
      tap((response: T) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
      }),
      catchError((error) => {
        this.loaderService.stopLoader();
        return throwError(error);
      })
    );
  }
  postWithOutLoading<T = any>(url: string, body = {}): Observable<any> {
    return this.http.post<T>(this.baseUrl + url, body);
  }

  deleteReq<T = any>(url: string, showLoader = true): Observable<T> {
    // return this.http.delete<T>(environment.baseUrl + url);
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.delete<T>(this.baseUrl + url).pipe(
      tap((response: T) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
      }),
      catchError((error) => {
        this.loaderService.stopLoader();
        return throwError(error);
      })
    );
  }
  handleHttpError(error: any, showLoader: boolean): void {
    if (showLoader) {
      this.loaderService.stopLoader();
    }
    if (!error.ok) {
      if (error.status === 404) {
        this.router.navigate(['/errors/404']);
      } else if (error.status === 500) {
        this.router.navigate(['/errors/500']);
      }
    }
  }
}
