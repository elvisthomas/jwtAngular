import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  baseUrl: string = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }

  public doSignin(param: object): any {
    let apiURL = `${this.baseUrl}users/doSignin`;
    return this.http.post(apiURL, param);
  }
}
