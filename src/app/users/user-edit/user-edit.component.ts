import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less']
})
export class UserEditComponent implements OnInit {

  user: User;

  password: string;
  password2: string;

  message = '';

  isUsernameValid = false;
  isPasswordValid = false;
  isPassword2Valid= false;
  doesPasswordsMatch = false;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];
    if(id) {
      this.dataService.getUser(+id).subscribe(
        next => {
          this.user = next;
          this.message = '';
        },
        error => this.message = 'Impossible de récupérer l\'utilisateur'
      );
    } else {
      this.user = new User();
    }
  }

  checkIfUsernameIsValid() {
    if(this.user.username) {
      this.isUsernameValid = this.user.username.trim().length > 0;
    }
  }

  checkIfPasswordIsValid() {
    if(this.password) {
      this.isPasswordValid = this.password.trim().length > 0;
    }
  }

  checkIfPasswordConfirmIsValid() {
    if(this.password2) {
      this.isPassword2Valid = this.password2.trim().length > 0;
    }
  }

  checkIfPasswordsMatch() {
    this.doesPasswordsMatch = this.password === this.password2;
  }

  onSubmit() {
    if(this.user.id) {
      // edit user
    } else {
      this.checkIfPasswordsMatch();
      if(this.doesPasswordsMatch) {
        this.dataService.addUser(this.user, this.password).subscribe(
          next => this.router.navigate(['login'], {queryParams: {registered: 'registered'}}),
          error => console.log(error.status)
        );
      } else {
        this.message = 'Les mots de passe ne correspondent pas';
      }
    }
  }

}
