import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatesComponent } from './states.component';
import { StateComponent } from './state/state.component';


const routes: Routes = [
  {
    path: '',
    component: StatesComponent,
    children: [
      {
        path: ':id',
        component: StateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatesRoutingModule { }
