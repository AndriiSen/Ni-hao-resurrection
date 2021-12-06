import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserAuthorizationService {


  constructor(private http: HttpClient) { }

  private token;

  sendRegForm(form: any) {
    return this.http.post('http://localhost:3000/api/auth/register', form);
  }


  sendLoginForm(form: any) {
    return this.http
      .post<any>('http://localhost:3000/api/auth/login', form, {
        observe: 'response',
      })
      .pipe(
        map((user) => {
          this.token = user.headers.get('Auth-token')
          return user;
        })
      );
  }

  getToken() {
    return localStorage.getItem('Auth-Token')
  }
}