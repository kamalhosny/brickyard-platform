import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestMethod, Request,
         RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { ApiBaseUrl, fullUrl } from './api.service';

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend,
              options: RequestOptions,
              public http: Http) {
    super(backend, options);
  }

  ApiBaseUrl() {
    return ApiBaseUrl;
  }

  fullUrl(path: string) {
    return fullUrl(path);
  }

  public extractData(response: Response) {
    const body = response.json();
    return body || {};
  }

  public handleError(error: Response): Observable<any> {
    console.error(error);
    return throwError(error.json().error || 'Server error');
  }
}
