import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  message = '';
  username: string;
  password: string;

  constructor(private authService: AuthService,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.authService.authenticate(this.username, this.password)) {
      const url = this.activatedRoute.snapshot.queryParams['requested'];
      this.route.navigateByUrl(url);
    } else {
      this.message = 'Le nom d\'utilisateur ou le mot de passe n\'a pas été reconnu.';
    }
  }

}
