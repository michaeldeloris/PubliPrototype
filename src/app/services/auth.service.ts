import { DataService } from 'src/app/services/data.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();

  role: string;
  roleSetEvent = new EventEmitter<boolean>();

  username: string;
  usernameSetEvent = new EventEmitter<boolean>();

  constructor(private dataService: DataService) { }

  authenticate(username: string, password: string) {
    this.dataService.validateUser(username, password).subscribe(
      next => {
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    );
  }

  setUpUsername() {
    this.dataService.getUsername().subscribe(
      next => {
        this.username = next.username;
        this.usernameSetEvent.emit(true);
      });
  }

  setUpRole() {
    this.dataService.getRole().subscribe(
      next => {
        this.role = next.role;
        this.roleSetEvent.emit(true);
      }
    );
  }

  checkIfAlreadyAuthenticated() {
    this.dataService.getRole().subscribe(
      next => {
        if(next.role !== '' && next.role !== 'ANONYMOUS') {
          this.role = next.role;
          this.isAuthenticated = true;
          this.authenticationResultEvent.emit(true);
        }else {
          this.authenticationResultEvent.emit(false);
        }
      }
    );
  }

  logout() {
    this.dataService.logout().subscribe();
    this.isAuthenticated = false;
    this.authenticationResultEvent.emit(false);
  }
}
