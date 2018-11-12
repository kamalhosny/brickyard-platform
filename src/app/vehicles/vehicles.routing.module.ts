import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiclesComponent } from './vehicles.component';
import { VehicleComponent } from './vehicle/vehicle.component';


const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    children: [
      {
        path: ':id',
        component: VehicleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
