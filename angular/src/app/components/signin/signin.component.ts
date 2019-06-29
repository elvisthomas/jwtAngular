import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { SigninService } from './signin.service';
import { JwtService } from './../../core/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AlertService } from './../../core/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  userDetails: FormGroup;
  constructor(
    private fb: FormBuilder,
    private signinService: SigninService,
    private toastr: ToastrService,
    private router: Router,
    private jwtService: JwtService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }
  validation_messages = {
    'email': [ 
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }  
    ],
    'password': [
      { type: 'required', message: 'Password is required' }
    ]
  };

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // user details form validations
    this.userDetails = this.fb.group({
       email: new FormControl('', Validators.compose([
         Validators.required,
         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
       ])),
       password: new FormControl('', Validators.required)
    });
  };

  doSignin(value){
    this.alertService.clear();
    this.signinService.doSignin(value).subscribe((data) => {
      if(data.status == 200){
        this.toastr.success(data.message,'Success');
        this.jwtService.saveToken(data.token);
        let userDetails = {
          id: data.data._id,
          name: data.data.fullname,
          email: data.data.email,
          username: data.data.username
        }
        this.jwtService.saveCurrentUser(JSON.stringify(userDetails));
        this.router.navigate(['/dashboard']);
      }else{
        this.alertService.error(data.message);
      }
    });
  }

}
