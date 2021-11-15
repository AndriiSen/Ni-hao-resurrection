import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationService {
  url: string = 'http://localhost:3000/api/auth/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  sendRegForm(form: any) {
    return this.http.post(this.url, form);
  }

  sendLoginForm(form: any) {
    return this.http.post<any>('http://localhost:3000/api/auth/login', form, { observe: 'response'}).pipe(
      map(user => {
      return user;
 }))
  }
}
