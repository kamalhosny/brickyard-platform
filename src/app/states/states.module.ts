import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StatesComponent } from './states.component';
import { StatesRoutingModule } from './states.routing.module';
import { SharedModule } from '@shared/shared.module';
import { StateComponent } from './state/state.component';
import { AdminStatesListComponent } from './admin-states-list/admin-states-list.component';



@NgModule({
  imports: [
    CommonModule,
    StatesRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
  	StatesComponent,
  	StateComponent,
  	AdminStatesListComponent
  ]
})
export class StatesModule { }
