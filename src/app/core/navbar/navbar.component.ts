import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public selectedTab: string = "vehicles";

  constructor(private sharedService: SharedService,
  			  private _router: Router) { }

  ngOnInit() {
  	this.selectedTab = this._router.url.split('/')[1];
  }

  tabClicked(tabName){
  	this.selectedTab = tabName;
  	this._router.navigate([tabName])
  }
}
