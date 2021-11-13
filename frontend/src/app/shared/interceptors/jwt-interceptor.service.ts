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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15ZW1haWwzQGdtYWlsLmNvbSIsImlhdCI6MTYzNjgwNzU1NiwiZXhwIjoxNjM2ODkzOTU2fQ.LOkC3Q_5ttUmMIDM9hCXwL5b-yCb9PlibTrsrzp6BZc'
      }
    })
    return next.handle(tokenizedReq)
  }
}
