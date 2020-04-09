import { ActivatedRoute } from '@angular/router';
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
    } else {
      this.user = new User();
    }

  }

}
