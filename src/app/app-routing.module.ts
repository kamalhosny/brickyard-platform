import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreComponent } from '@core/core.component';
import { LoginComponent } from '@app/login/login.component';


const routes: Routes = [
	{
	    path: 'login',
	    component: LoginComponent
    },
    {
        path: '',
        component: CoreComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
