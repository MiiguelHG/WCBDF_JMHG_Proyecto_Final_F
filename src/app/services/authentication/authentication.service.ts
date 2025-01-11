import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../../data/user';
import { UserResponse } from '../../data/response-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private urlApi = 'https://wcbdf-jmhg-proyecto-final.onrender.com/api/v1/users'

  constructor(private http: HttpClient) { }

  login(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.urlApi, user)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Este metodo es para proteger las rutas de la aplicacion
  isLogeddIn(): boolean {
    return !!localStorage.getItem('username') && !!localStorage.getItem('password');
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
