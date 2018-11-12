import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { fullUrl } from './api.service';


@Injectable()
export class AuthenticationService {
    private _loginUrl = fullUrl('/sessions');
    isLoggedIn = false;
    constructor(private _http: Http,
                private _router: Router,
                private _httpClient: HttpClient) { }

    login(user) {
        return this._http.post(this._loginUrl, user).pipe(
          map((response: Response) => {
            const jsonResponse = response.json();
            const parsed_json = JSON.parse(response['_body']);
            const token = parsed_json.auth_token;
            const role = parsed_json.role;
            const id = parsed_json.id;
            if (token) {
              localStorage.setItem('currentUser', JSON.stringify(
                {
                  id: id,
                  role: role,
                  token: token
                }
              ));
              this.isLoggedIn = true;
              return true;
            } else {
              return false;
            }
          }),
          catchError(this.handleError)
        );
    }

    logout(): void {
      localStorage.removeItem('currentUser');
      this.isLoggedIn = false;
      this._router.navigate(['login']);
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
      if(error.error.length > 0){
        return throwError(error.error[0]);
      }else{
        return throwError('Server Error');
      }
    }
}
