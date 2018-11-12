import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { State } from '@shared/models/state.model';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(private sharedService: SharedService,
              private _toastr: ToastrService) { }

  ngOnInit() {
  	this.sharedService.getStates().subscribe( response => {
  		let states = response.map( state => new State(state))
  		this.sharedService.states.next(states);
  	}, error => {
      this._toastr.error(error, 'Error');
    })
  }

}
