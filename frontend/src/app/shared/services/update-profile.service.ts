import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15ZW1haWwzQGdtYWlsLmNvbSIsImlhdCI6MTYzNjQ4NjY5MiwiZXhwIjoxNjM2NTczMDkyfQ.2-g1OPO0L_VTfC4rVCI4kN4mmkVWcnuLr9LmbvIhQaU'
    })
  }

  constructor(private http: HttpClient) { }

  updateUserInfo(form: any, id: string) {
    const backEndpoint = `http://localhost:3000/api/user/${id}/update`
    return this.http.put(backEndpoint, form, this.httpOptions);
  }
}
