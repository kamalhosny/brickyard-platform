import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components


// Services
import { VehiclesService } from './services/vehicles.service';
import { StatesService } from './services/states.service';
import { StatesListComponent } from './components/states-list/states-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    StatesListComponent
  ],
  declarations: [
    StatesListComponent
  ],
  providers: [
    RouterModule,
    VehiclesService,
    StatesService
  ]
})

export class SharedModule {}