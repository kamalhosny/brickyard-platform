import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { AuthenticationService } from './authentication.service';
import { SharedService } from './shared.service';



@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private _auth: AuthenticationService,
              private _router: Router,
              private sharedService: SharedService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let user = localStorage.getItem('currentUser');
      if (user != null && JSON.parse(user).role == "admin") {
        let parsed_user = JSON.parse(user);
        this._auth.isLoggedIn = true;
        this.sharedService.setCurrentUser(parsed_user.id, parsed_user.role, parsed_user.token);
        return true;
      } else {
        this._router.navigate(['']);
        return false;
      }
    };
}
