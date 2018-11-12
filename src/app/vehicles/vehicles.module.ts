import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesComponent } from './vehicles.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

import { VehiclesRoutingModule } from './vehicles.routing.module';
import { SharedModule } from '@shared/shared.module';
import { VehicleComponent } from './vehicle/vehicle.component';

@NgModule({
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    SharedModule
  ],
  exports:[
  	VehicleDetailsComponent,
  	VehiclesListComponent,
    VehicleComponent
  ],
  declarations: [
  	VehiclesComponent,
  	VehiclesListComponent,
  	VehicleDetailsComponent,
  	VehicleComponent
  ]
})
export class VehiclesModule { }
