import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  saveToken(token : string){
    window.localStorage.setItem('jwtToken',token);
  }
  getToken() : string {
    return window.localStorage.getItem('jwtToken');
  }
  saveCurrentUser(userDetails){
    window.localStorage.setItem('currentUser', userDetails);
  }
  getCurrentUser() : string {
    return window.localStorage.getItem('currentUser');
  }
  destroyToken(){
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('currentUser');
  }
  saveUsername(username : string){
    localStorage.setItem('username',username);
  }
  getUsername(){
    return localStorage.getItem('username');
  }

}
