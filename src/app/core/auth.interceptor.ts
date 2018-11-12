import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, first, catchError } from 'rxjs/operators';

// Services
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.token) {
            return next.handle(this.addToken(request, user.token)).pipe(
            tap(event => {
              if (event instanceof HttpResponse) {
                  return event;
              }
            }),
            catchError((error) => {
              if (!this.isAuthError(error)) {
                throw error;
              }
              this._auth.logout();
              throw error;
            })) as any;
        } else {
            return next.handle(request);
        }
    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { 'Authorization':  token } });
    }

    constructor(private _auth: AuthenticationService,
                private _router: Router) {}

    private isAuthError(error: any): boolean {
        return error instanceof HttpErrorResponse && error.status === 401;
    }
}
