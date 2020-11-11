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

  message = '';

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

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
    }
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
    }
  }

}
