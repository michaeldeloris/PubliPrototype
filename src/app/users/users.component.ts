import { User } from './../models/User';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  users: Array<User>;

  message: string;
  errorMessage: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      next => this.users = next,
      error => this.message = 'Impossible de récupérer la liste des utilisateurs.'
    );
    this.loadMessage();
  }

  loadMessage() {
    const op = this.route.snapshot.queryParams['op'];
    switch(op) {
      case 'edit': {
        this.message = 'Utilisateur modifié avec succès.';
        break;
      }
      case 'delete': {
        this.message = 'Utilisateur supprimé avec succès.';
        break;
      }
      default : this.message = '';
    }
  }

  accessEditUser(id: number) {
    this.router.navigate(['users', 'edit'], {queryParams: {id}});
  }

  deleteUser(id: number) {
    const result = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
    if(result) {
      this.dataService.deleteUser(id).subscribe(
        next => {
          this.router.navigate(['users'], {queryParams: {op : 'delete'}}).then(() => this.loadMessage());
          const index =  this.users.indexOf(this.users.find(user => user.id === id));
          this.users.splice(index, 1);
        },
        error => this.errorMessage = 'Impossible de supprimer l\'utilisateur'
      );
    }
  }

}
