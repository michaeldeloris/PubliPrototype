import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  message = '';
  infoMessage = '';

  username: string;
  password: string;

  subscription: Subscription;

  constructor(private authService: AuthService,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const comesFromRegisterPage = this.activatedRoute.snapshot.queryParams['registered'];
    if(comesFromRegisterPage) {
      this.infoMessage = 'Utilisateur créé avec succès.';
    }
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    this.subscription = this.authService.authenticationResultEvent.subscribe(
      result => {
        if(result) {
          const url = this.activatedRoute.snapshot.queryParams['requested'];
          this.route.navigateByUrl(url);
        } else {
          this.message = 'Le nom d\'utilisateur ou le mot de passe n\'a pas été reconnu.';
        }
      }
    );
    this.authService.checkIfAlreadyAuthenticated();
    this.authService.authenticate(this.username, this.password)
  }

  accesUsersEdit() {
    this.route.navigate(['users', 'edit']);
  }
}
