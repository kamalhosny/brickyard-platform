import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { AuthenticationService } from './authentication.service';
import { SharedService } from './shared.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthenticationService,
              private _http: HttpClient,
              private _router: Router,
              private sharedService: SharedService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('currentUser') != null) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this._auth.isLoggedIn = true;
        this.sharedService.setCurrentUser(user.id, user.role, user.token);
        return true;
      } else {
        this._router.navigate(['login']);
        return false;
      }
    };
  }
