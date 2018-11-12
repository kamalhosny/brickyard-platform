import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';
import { HttpService } from '@core/http.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { fullUrl } from '@core/api.service';
import { SharedService } from '@core/shared.service';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
	private statesUrl = fullUrl('states/');

  constructor(private _http: HttpClient,
  						private sharedService: SharedService) { }

  getStates(queryParams = {}) {
    return this._http.get(this.statesUrl, { params: queryParams }).pipe(
    	map(data => data),
    	catchError(this.handleError)
    );
  }

  getState(stateId) {
    return this._http.get(this.statesUrl + stateId, {}).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  createState(stateData){
    return this._http.post(this.statesUrl, {state: stateData}).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  deleteState(stateId){
    return this._http.delete(this.statesUrl + stateId, {}).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  updateState(stateId, stateData){
    return this._http.put(this.statesUrl + stateId, {state: stateData}).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if(error.error.length > 0){
      return throwError(error.error[0]);
    }else{
      return throwError('Server Error');
    }
  }

}
