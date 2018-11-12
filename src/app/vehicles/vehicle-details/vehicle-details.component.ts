import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '@shared/models/vehicle.model';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  @Input() vehicle: Vehicle = new Vehicle();
  @Input() selectedVehicleId: number;
  @Output() vehicleSelected: EventEmitter<Vehicle> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clicked(){
  	this.vehicleSelected.emit(this.vehicle);
  }

}
