import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '@shared/models/state.model';
import { StatesService } from '@shared/services/states.service'
import { SharedService } from '@core/shared.service'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-states-list',
  templateUrl: './admin-states-list.component.html',
  styleUrls: ['./admin-states-list.component.scss']
})
export class AdminStatesListComponent implements OnInit {
  @Input() public states: Array<State> = [];
  public newStateName: string = "";
  public creationFormOpened: boolean = false;
  constructor(private statesService: StatesService,
  						private sharedService: SharedService,
  						private _router: Router,
              private _toaster: ToastrService) { }

  ngOnInit() {
  }

  toggleStateCreation(event, value){
  	event.stopPropagation();
  	this.creationFormOpened = value;
  }

  addState() {
  	this.statesService.createState({name: this.newStateName}).subscribe( state =>{
  		this.states.push(new State(state));
  		this.sharedService.states.next(this.states);
  		this.creationFormOpened = false;
  		this.newStateName = "";
      this._toaster.success('state created', 'Success')
  	}, error => {
      this._toaster.error(error, 'Error')
  	})
  }

  deleteState(event, stateId){
  	event.stopPropagation();
  	this.statesService.deleteState(stateId).subscribe( resp => {
  		let stateIndex =this.states.findIndex(state => state.id == stateId);
  		this.states.splice(stateIndex, 1)
      this._toaster.success('state deleted', 'Success')
  	}, error => {
      this._toaster.error(error, 'Error')
  	})
  }

  stateSelected(state) {
  	this._router.navigate([`states/${state.id}`])
  }
}
