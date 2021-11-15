import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  updateUserInfo(form: any, id: number) {
    const backEndpoint = `http://localhost:3000/api/user/${id}/update`
    return this.http.put(backEndpoint, form, this.httpOptions);
  }

  getUserInfo(id: number): Observable<any> {
    return this.http.get('http://localhost:3000/api/user/' + id).pipe(
      map((user: any) => user)
    );
  }
}
