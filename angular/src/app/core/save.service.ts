import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SaveService {
  apiBase = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }
  
  post(url: string, param?): Observable<any> {
    let apiURL = this.apiBase + url;
    return this.httpClient.post(apiURL, param).pipe(map(res => res));
  }
}
