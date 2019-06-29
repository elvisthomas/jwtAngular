import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homelayout',
  template: `
    <app-header></app-header> 
    <router-outlet></router-outlet>
  `
})
export class HomelayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
