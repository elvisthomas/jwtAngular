import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaveService } from './../..//core/save.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  baseUrl: string = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private saveService: SaveService
  ) { }

  public doSignup(param: object): Observable<any> {
    return this.saveService.post('users/doSignup', param).pipe(map(
        data => {
          return data
        }
    ));


  }
  public getUsername(username: string): Observable<any> {
    let apiURL = `${this.baseUrl}users/getUsername/${username}`;
    return this.http.get(apiURL);
  }
  
}
