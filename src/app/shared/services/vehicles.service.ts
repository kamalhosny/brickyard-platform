import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject, Subject, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Vehicle } from '@shared/models/vehicle.model'
import { HttpService } from '@core/http.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { fullUrl } from '@core/api.service';
import { SharedService } from '@core/shared.service';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
	private vehiclesUrl = fullUrl('users/');

  constructor(private _http: HttpClient,
  						private sharedService: SharedService) { }

  getVehicles(queryParams = {}) {
    return this._http.get(`${this.vehiclesUrl}${this.sharedService.currentUser.id}/vehicles`, { params: queryParams }).pipe(
    	map(data => data),
    	catchError(this.handleError)
    );
  }

  updateVehicle(vehicleId, vehicleData) {
    return this._http.put(`${this.vehiclesUrl}${this.sharedService.currentUser.id}/vehicles/${vehicleId}`,
                          { vehicle: vehicleData })
    .pipe(
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
