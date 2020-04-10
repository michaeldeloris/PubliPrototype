import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.less']
})
export class TopbarComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private authService: AuthService) { }

  isLogged = false;

  subscription: Subscription;

  message = '';

  ngOnInit(): void {
    this.subscription = this.authService.authenticationResultEvent.subscribe(
      next => this.isLogged = this.authService.isAuthenticated
    )
    this.authService.checkIfAlreadyAuthenticated();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    this.authService.logout();
    this.router.navigate(['']);
  }

}
