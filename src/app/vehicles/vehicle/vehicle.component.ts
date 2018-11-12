import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { SharedService } from '@core/shared.service'
import { Vehicle } from '@shared/models/vehicle.model';
// import { State } from '@shared/models/state.model';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  public vehicle: Vehicle = new Vehicle();
  public currentVehicle = new BehaviorSubject<Vehicle>(new Vehicle());
  // public states: Array<State> = [];
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  	this.sharedService.vehicle.subscribe(vehicle => {
  		this.vehicle = vehicle;
      this.currentVehicle.next(vehicle);
  	});
  }

}
