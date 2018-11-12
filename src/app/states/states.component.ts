import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '@core/shared.service';
import { State } from '@shared/models/state.model';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
	public states: Array<State> = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  	this.sharedService.states.subscribe( states => {
  		this.states = states;
  	})
  }

}
