import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Role, User } from 'src/app/models/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less']
})
export class UserEditComponent implements OnInit {

  user: User;

  roles = Object.keys(Role);

  password: string;
  password2: string;

  message = '';

  isUsernameValid = false;
  isPasswordValid = false;
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
    if(this.user.id) {
      this.dataService.updateUser(this.user).subscribe(
        next => {
          location.reload();
        },
        error => this.message = 'Un problème est survenu. Veuillez patienter quelques secondes, puis recommencez.'
      )
    } else {
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

}
