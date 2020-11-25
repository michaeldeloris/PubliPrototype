import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.less']
})
export class UserDetailComponent implements OnInit {

  user: User;

  message: string;

  constructor(private dataService: DataService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.dataService.getUsers().subscribe(
      next => {
        if (id) {
          this.user = next.find(user => user.id === +id);
        } else {
          this.user = next.find(user => user.username === this.authService.username);
        }
      },
      error => this.message = 'Connexion avec le serveur interrompue'
    );
  }

}
