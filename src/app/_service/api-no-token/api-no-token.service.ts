import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import swal from 'sweetalert2';

// Warning Type Alert
export function typeWarning(error) {
  swal.fire("Warning!", error, "warning");
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class ApiNoTokenService  implements OnDestroy {
  private url = environment.apiUrl;
  private subs: Subject<void> = new Subject();
  private _refresh = new Subject();
  constructor(
    public http: HttpClient,
    public router: Router,
  ) { }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  // --------------------------for Handle Error----------------
  handleError(error:  HttpErrorResponse) {
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

  login(user: any): Observable<any> {
    return this.http.post<any>(this.url + 'auth/login', user, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  resetPassword(user: any): Observable<any> {
    return this.http.post<any>(this.url + 'auth/resetpassword', user, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.url + 'auth/logout').pipe(
      catchError(this.handleError),
    );
  }
}
