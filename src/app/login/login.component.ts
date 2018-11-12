import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from '../core/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';

    constructor(
        private _router: Router,
        private _auth: AuthenticationService) {}

    ngOnInit() {
      if (localStorage.getItem('currentUser')) {
          this._router.navigate(['vehicles']);
      }
      this.createForm();
    }

    private createForm() {
        this.loginForm = new FormGroup({
          email: new FormControl('', [Validators.required, this.validateEmail]),
          password: new FormControl('', Validators.required),
        });
    }

    validateEmail(controls) {
        const regExp = new RegExp(/\S+@\S+\.\S+/);
        if (regExp.test(controls.value)) {
          return null;
        } else {
          return { 'validateEmail': true };
        }
    }

    onLoginSubmit() {
        const user = {
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value
        };
        this._auth.login(user)
            .subscribe(result => {
                if (result === true) {
                    this._router.navigate(['vehicles']);
                } else {
                    this.error = JSON.parse(result._body).errors;
                }
            });
    }
}
