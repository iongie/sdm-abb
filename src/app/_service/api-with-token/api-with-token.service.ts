import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';

// Warning Type Alert
export function typeWarning(error) {
  swal.fire("Warning!", error, "warning");
}

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtoYWlyYWJxYXJ5MjFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJBYmR1bCIsImlhdCI6MTU5ODE4NTg5MSwibmJmIjoxNTk4MTg1ODkxLCJleHAiOjE1OTgyMDM4OTF9.9H5SowFYQ5jsGhK0PIsNOWOXo9s2HUObwbSXFH5gZT8'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ApiWithTokenService implements OnDestroy {
  private url = environment.apiUrl;
  private subs: Subject<void> = new Subject();
  private _refresh = new Subject();
  constructor(
    public http: HttpClient,
    public router: Router,
    public CookieService : CookieService
  ) { }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  // --------------------------for Handle Error----------------
  handleError(error: HttpErrorResponse) {
    if(error.error.message == 'Expired token'){
      this.CookieService.delete('gieUs3r')
    }
    typeWarning(error.error.message);
    if(!navigator.onLine){
        console.error('Browser Offline')
    }  else {
       if (error instanceof HttpErrorResponse) {
         if(!navigator.onLine) {
           console.error('Browser Offline')
         } else {
           console.error('Http Error');
         }
       } else {
         console.error('Client Error');
       }
       console.error(error);
    }
    return throwError(error); 
  }

  get refresh() {
    return this._refresh;
  }

  getAll(apiUrl: any, token: any): Observable<any> {
    return this.http.get<any>(this.url + apiUrl, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        })
      }).pipe(
      catchError(this.handleError),
    );
  }

  getById(data: any, apiUrl: any, token: any): Observable<any> {
    return this.http.get<any>(this.url + apiUrl + data.id, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        })
      }).pipe(
      catchError(this.handleError),
    );
  }

  add(data: any, apiUrl: any, token: any): Observable<any> {
    return this.http.post<any>(this.url + apiUrl, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  isLoggednIn() {
    return this.CookieService.get('gieUs3r') !== '';
  }

}
