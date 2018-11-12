import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SharedService } from '@core/shared.service';
import { VehiclesService } from '@shared/services/vehicles.service';
import { ToastrService } from 'ngx-toastr';


import { Vehicle } from '@shared/models/vehicle.model';
import { State } from '@shared/models/state.model';


@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.scss']
})
export class StatesListComponent implements OnInit {

  constructor(private sharedService: SharedService,
              private vehiclesService: VehiclesService,
              private _toastr: ToastrService) { }
  public currentState: State = new State();
  public states: Array<State> = [] ;
  public vehicle: Vehicle = new Vehicle();
  @Input() public currentVehicleSubject = new BehaviorSubject<Vehicle>(new Vehicle());


  ngOnInit() {
    this.currentVehicleSubject.subscribe( vehicle => {
      this.currentState = vehicle.currentState;
      this.vehicle = vehicle
    })

  	this.sharedService.states.subscribe( states => {
  		this.states = states;
  	})
  }

  updateCurrentState(orederChangedBy) {
    let stateOrder = this.currentState.order + orederChangedBy;
    let stateIndex = this.states.findIndex(state => state.order == stateOrder);
    if(stateIndex == -1) {
      return;
    }
    const data = {
      "current_state_id": this.states[stateIndex].id
    }
    this.vehiclesService.updateVehicle(this.vehicle.id, data).subscribe(response => {
      this.sharedService.vehicle.next(new Vehicle(response));
      this._toastr.success('The vehicle state updated successfully', 'Success');
    }, error => {
      this._toastr.error(error, 'Error');
    })
  }

}
