import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { UserAuthorizationService } from './shared/services/user-authorization.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, public router: Router) {}

  intercept(req, next) {
    let authService = this.injector.get(UserAuthorizationService);
    const started = Date.now();
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `bearer + ${authService.getToken()}`,
      },
    });

    return next.handle(tokenizedReq).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const elapsed = Date.now() - started;
      }
    });
  }
}
