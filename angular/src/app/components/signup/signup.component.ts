import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { UsernameValidator } from './../../core/validaters/username.validaters';
import { PasswordValidator } from './../../core/validaters/password.validater';
import { SignupService } from './signup.service';
import { environment } from './../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from './../../core/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  constructor( 
    private fb: FormBuilder,
    private signupService: SignupService,
    private toastr: ToastrService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  userDetails: FormGroup;
  matching_passwords_group: FormGroup;
  validation_messages = {
    'fullname': [ { type: 'required', message: 'Full name is required' } ],
    'username': [ 
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [ 
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }  
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  };

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // user details form validations
    this.userDetails = this.fb.group({
      fullname: ['', Validators.required ],
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
       ])),
       email: new FormControl('', Validators.compose([
         Validators.required,
         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
       ])),
       matching_passwords: this.matching_passwords_group,
       terms: new FormControl(false, Validators.pattern('true'))
    });
  };

  doSignup(value){
    this.signupService.doSignup(value).subscribe((data) => {
      if(data.status == 200){
        this.toastr.success(data.message,'Success');
        this.router.navigate(['/signin']);
      }else{
        this.alertService.error(data.message);
      }
    });
  }
}
