import { Component, OnInit } from '@angular/core';
import { JwtService } from './../../core/jwt.service';
import { AlertService } from './../../core/alert/alert.service';
import { Router } from '@angular/router';
import { currentUser } from './header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: currentUser = new currentUser;
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private alertService: AlertService
  ) { 
    this.currentUser = JSON.parse(this.jwtService.getCurrentUser());
  }

  ngOnInit() {
  }

  logout(){
    this.jwtService.destroyToken();
    this.alertService.success('You have logged out successfully.');
    this.router.navigate(['/signin']);
  }

}