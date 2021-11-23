import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserAuthorizationService {
  url: string = 'http://localhost:3000/auth/register';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  urlLogin: string = 'http://localhost:3000/api/auth/login';
  httpLoginOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'barer',
    }),
  };

  constructor(private http: HttpClient) {}

  sendRegForm(form: any) {
    return this.http.post(this.url, form, this.httpOptions);
  }

  sendLoginForm(form: any) {
    return this.http
      .post<any>('http://localhost:3000/api/auth/login', form, {
        observe: 'response',
      })
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  getToken() {
    return localStorage.getItem('Auth-Token');
  }

  
}




