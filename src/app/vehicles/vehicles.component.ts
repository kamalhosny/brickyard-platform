import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { VehiclesService } from '@shared/services/vehicles.service';
import { SharedService } from '@core/shared.service';

import { Vehicle } from '@shared/models/vehicle.model';
import { State } from '@shared/models/state.model';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
	public states: Array<State> = [];
  public vehiclesArray: Array<Vehicle> = [];
	public vehicles = new BehaviorSubject<Array<Vehicle>>([]);
  public selectedVehicle: Vehicle = new Vehicle();

  constructor(private vehiclesService: VehiclesService,
  			      private sharedService: SharedService,
              private _router: Router) { }

  ngOnInit() {
    this.sharedService.vehicle.subscribe(vehicle => {
      if(this.selectedVehicle && vehicle && this.selectedVehicle.currentState.id != vehicle.currentState.id){
        this.selectedVehicle = vehicle;
        let vehicleIndex = this.vehiclesArray.findIndex(v => v.id == vehicle.id);
        this.vehiclesArray.splice(vehicleIndex, 1, vehicle);
        this.vehicles.next(this.vehiclesArray);
      }
    })
  	this.vehiclesService.getVehicles().subscribe( response => {
  		this.vehiclesArray = response.map(vehicle => new Vehicle(vehicle));
  		this.vehicles.next(this.vehiclesArray);
  	});
  }

  vehicleSelected(vehicle) {
    if( vehicle && vehicle.id) {
      this.selectedVehicle = vehicle;
      this.sharedService.vehicle.next(vehicle);
      this._router.navigate([`vehicles/${vehicle.id}`])
    }
  }

}
