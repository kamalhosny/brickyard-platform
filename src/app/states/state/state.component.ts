import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatesService } from '@shared/services/states.service';
import { SharedService } from '@core/shared.service';
import { State } from '@shared/models/state.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  constructor(private _router: Router,
  			  private statesService: StatesService,
  			  private activatedRoute: ActivatedRoute,
  			  private sharedService: SharedService,
          private _toaster: ToastrService) { }
  public state: State = new State();

  ngOnInit() {
  	this.activatedRoute.url.subscribe(url =>{
  	    let stateId = url[0].path;
	  	this.statesService.getState(stateId).subscribe(state => {
	  		this.state = new State(state);
	  	})
  	});
  }

  updateState(){
  	let data ={
  		name: this.state.name,
  		order: this.state.order
  	}
  	this.statesService.updateState(this.state.id, data).subscribe( state => {
  		this.sharedService.getStates().subscribe( states => {
  			this.sharedService.states.next(states.map( state => new State(state)));
        this._toaster.success('State has been updated successfully', 'success')
  		})
  	},
    error =>{
      this._toaster.error(error, 'Error')
    })
  }

}
