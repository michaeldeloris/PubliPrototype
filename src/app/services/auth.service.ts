import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor() { }

  authenticate(username: string, password: string) {
    if(username === 'michael' && password === 'secret') {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }
}
