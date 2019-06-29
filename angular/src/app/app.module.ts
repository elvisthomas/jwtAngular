import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';  
import { SignupComponent } from './components/signup/signup.component';
import { 
  MatInputModule, 
  MatSelectModule, 
  MatButtonModule, 
  MatCheckboxModule, 
  MatIconModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlertComponent } from './core/alert';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingComponent } from './core/loading/loading.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomelayoutComponent } from './components/layouts/homelayout.component';
import { LoginlayoutComponent } from './components/layouts/loginlayout.component';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    AlertComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    HomelayoutComponent,
    LoginlayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {  
        closeButton: true,  
      } 
    ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    // MATERIAL
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
