import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.less']
})
export class UnauthorizedComponent implements OnInit, OnDestroy {

  isLogged = false;

  loadingData = false;

  logInSubscription: Subscription;
  logOutSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.logInSubscription = this.authService.roleSetEvent.subscribe(
      next => {
        this.isLogged = this.authService.isAuthenticated;
    });

    this.logOutSubscription = this.authService.logOutEvent.subscribe(
      next => {
        this.loadingData = false;
        this.router.navigate(['login']);
    });

    this.authService.checkIfAlreadyAuthenticated();
  }

  ngOnDestroy() {
    if(this.logInSubscription) {
      this.logInSubscription.unsubscribe();
    }
    if(this.logOutSubscription) {
      this.logOutSubscription.unsubscribe();
    }
  }

  processLogIn() {
    if(this.isLogged) {
      this.loadingData = true;
      this.authService.logout();
      return;
    }
    this.router.navigate(['login']);
  }

  accessHomePage() {
    this.router.navigate([''])
  }

}
