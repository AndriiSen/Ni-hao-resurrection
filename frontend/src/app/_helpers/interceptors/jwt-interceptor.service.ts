import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: any, next: any) {
    let tokenizedReq = req.clone({
      setHeaders: {
        // Authorization: `Bearer ${localStorage.getItem('Auth-Token')}`
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15ZW1haWwzQGdtYWlsLmNvbSIsImlkIjoyOSwiaWF0IjoxNjM3ODQ2MDQyLCJleHAiOjE2Mzc5MzI0NDJ9.zWUvp0XT3RomHQzZAvs-rR1rUtc-LcbHvmgF9YzcP_8`
      }
    })
    return next.handle(tokenizedReq);
  }
}
