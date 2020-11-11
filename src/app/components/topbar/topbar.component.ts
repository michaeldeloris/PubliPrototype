import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.less']
})
export class TopbarComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private authService: AuthService) { }

  isLoading = true;
  isLogged = false;
  isAdmin = false;

  roleSubscription: Subscription;
  authUpdateSubscription: Subscription;

  message = '';

  ngOnInit(): void {
    this.roleSubscription = this.authService.roleSetEvent.subscribe(
      next => {
        this.isLogged = this.authService.isAuthenticated;
        this.isLoading = false;
      }
    )
    this.authUpdateSubscription = this.authService.authenticationResultEvent.subscribe(
      next => {
        this.isLogged = this.authService.isAuthenticated;
        this.isAdmin = this.authService.role === 'ADMIN';
        this.isLoading = false;
      }
    )
    this.authService.checkIfAlreadyAuthenticated();
  }

  ngOnDestroy() {
    if(this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
    if(this.authUpdateSubscription) {
      this.authUpdateSubscription.unsubscribe();
    }
  }

  accessUsers() {
    this.router.navigate(['users']);
  }

  accessHome() {
    this.router.navigate(['']);
  }

  accessLogin() {
    this.router.navigate(['login']);
  }

  accesUsersEdit() {
    this.router.navigate(['users', 'edit']);
  }

  logout() {
    this.isLoading = true;
    this.authService.logOutEvent.pipe(first()).subscribe(
      next => location.reload()
    );
    this.authService.logout();
  }

}
