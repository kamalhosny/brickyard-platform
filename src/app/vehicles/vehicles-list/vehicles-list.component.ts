import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Vehicle } from '@shared/models/vehicle.model';

import { VehiclesService } from '@shared/services/vehicles.service'
import { SharedService } from '@core/shared.service'

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {
  @Input() vehicles = new BehaviorSubject<Array<Vehicle>>([]);
  @Output() vehicleSelected: EventEmitter<Vehicle> = new EventEmitter();

  public vehiclesArray: Array<Vehicle> = [];
  public selectedVehicle: Vehicle = new Vehicle;


  constructor(private vehiclesService: VehiclesService,
              private _router: Router) { }

  ngOnInit() {
  	this.vehicles.subscribe( vehicles => {
      if(vehicles.length > 0){
    		this.vehiclesArray = vehicles;
        if(this._router.url.split('/')[2]){
         let vehicleIndex = vehicles.findIndex(vehicle => String(vehicle.id) === this._router.url.split('/')[2]);
         if(vehicleIndex == -1) {
           this._router.navigate(["vehicles"]);
           this.selectedVehicle = vehicles[0];
         }else{
           this.selectedVehicle = vehicles[vehicleIndex];
         }
        }else{
          this.selectedVehicle = vehicles[0];
        }
        this.vehicleSelected.emit(this.selectedVehicle);
      }
  	})

  }

  vehicleClicked(vehicle) {
  	this.selectedVehicle = vehicle;
    this.vehicleSelected.emit(vehicle);
  }

}
