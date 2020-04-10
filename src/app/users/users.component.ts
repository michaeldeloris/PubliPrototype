import { User } from './../models/User';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  users: Array<User>;

  message: string;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      next => this.users = next,
      error => this.message = 'Impossible de récupérer la liste des utilisateurs.'
    );
  }

  deleteUser(id: number) {
    const result = confirm('Vous allez supprimer cet utilisateur.');
    if(result) {
      this.dataService.deleteUser(id).subscribe(
        next => this.router.navigate(['users']),
        message => this.message = 'Impossible de supprimer l\'utilisateur'
      );
    }
  }

}
