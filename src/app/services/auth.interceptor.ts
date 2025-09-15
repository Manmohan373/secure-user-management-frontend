import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');
    const excludedUrls = [
      'http://localhost:1122/register',
      'http://localhost:1122/login'
    ];

    const modifiedReq = excludedUrls.includes(req.url) || !token
      ? req
      : req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

    return next.handle(modifiedReq);
  }
}