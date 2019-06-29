import { Component, OnInit } from '@angular/core';
import { JwtService } from './../../core/jwt.service';
import { currentUser } from './../header/header.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: currentUser = new currentUser;
  constructor(
    private jwtService: JwtService,
  ) {
    this.currentUser = JSON.parse(this.jwtService.getCurrentUser());
  }

  ngOnInit() {
  }

  

}
