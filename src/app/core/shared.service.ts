import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '@shared/models/user.model';
import { State } from '@shared/models/state.model';
import { Vehicle } from '@shared/models/vehicle.model';

import { fullUrl } from './api.service';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable()
export class SharedService {
  private usersUrl: string = fullUrl('users/');
  private statesUrl: string = fullUrl('states/');
  public currentUser: User = new User();
  public states = new BehaviorSubject<Array<State>>([]);
  public vehicle = new BehaviorSubject<Vehicle>(new Vehicle());


  constructor(private _http: HttpClient) { }

  setCurrentUser(id, role, token) {
    this.currentUser.id = id;
    this.currentUser.token = token;
    this.currentUser.role = role;
    this.currentUser.isAdmin = role === "admin";

    this.getCurrentUser();
  }

   getCurrentUser() {
    const url = `${this.usersUrl}${this.currentUser.id}`;
      this._http.get(url, {}).subscribe( data => {
      this.extractUser(data);
    });
  }

  getStates(){
    return this._http.get(this.statesUrl,{}).pipe(
      map( data  => data),
      catchError(this.handleError)
    );
  }

  setCurrentVehicle(vehicle){
    this.vehicle.next(vehicle);
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if(error.error.length > 0){
      return throwError(error.error[0]);
    }else{
      return throwError('Server Error');
    }
  }

  private extractUser(data){
    this.currentUser.id = data.id;
    this.currentUser.name = data.name;
    this.currentUser.email = data.email;
  }
}
