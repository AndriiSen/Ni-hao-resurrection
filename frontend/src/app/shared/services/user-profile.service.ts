import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  updateUserInfo(form: any, id: number) {
    return this.http.put(`http://localhost:3000/api/user/${id}/update`, form);
  }

  getUserInfo(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/user/${id}`);
  }

  getUserInfoToUpdate(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/user/${id}/update`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/users')
  }
}
