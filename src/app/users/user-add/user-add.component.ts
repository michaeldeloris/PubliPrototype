import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.less']
})
export class UserAddComponent implements OnInit {

  user: User;

  password: string;
  password2: string;

  message = '';

  isUsernameValid = false;
  isPasswordValid = false;
  doesPasswordsMatch = false;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  checkIfUsernameIsValid() {
    if(this.user.username) {
      this.isUsernameValid = this.user.username.trim().length > 0;
    } else {
      this.isUsernameValid = false;
    }
  }

  checkIfPasswordIsValid() {
    if(this.password) {
      this.isPasswordValid = this.password.trim().length > 5;
    } else {
      this.isPasswordValid = false;
    }
  }

  checkIfPasswordsMatch() {
    this.doesPasswordsMatch = this.password === this.password2;
  }

  useSubmitBtn() {
    let submitBtn: HTMLElement = document.getElementsByClassName('submit-btn')[0] as HTMLElement;
    submitBtn.click();
  }

  onSubmit() {
    this.checkIfPasswordsMatch();
    if(this.doesPasswordsMatch && this.isPasswordValid && this.isUsernameValid) {
      this.dataService.addUser(this.user, this.password).subscribe(
        next => this.router.navigate(['login'], {queryParams: {registered: 'registered'}}),
        error => this.message = 'Ce nom d\'utilisateur est déjà pris.'
      );
    } else {
      this.message = 'Les mots de passe ne correspondent pas';
    }
  }

}
