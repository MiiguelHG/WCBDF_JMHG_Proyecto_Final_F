import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../data/user';
import { UserResponse } from '../../data/response-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private urlApi = 'https://wcbdf-jmhg-proyecto-final.onrender.com/api/v1/users'

  constructor(private http: HttpClient) { }

  login(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.urlApi, user);
  }
}
