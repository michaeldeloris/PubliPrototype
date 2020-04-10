import { DataService } from 'src/app/services/data.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();

  role: string;

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

  setUpRole() {
    this.dataService.getRole().subscribe(
      next => this.role = next.role
    );
  }

  checkIfAlreadyAuthenticated() {
    this.dataService.getRole().subscribe(
      next => {
        if(next.role !== '' && next.role !== 'ANONYMOUS') {
          this.role = next.role;
          this.isAuthenticated = true;
          this.authenticationResultEvent.emit(true);
          console.log(this.role);

        }
      }
    );
  }
}
