import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.less']
})
export class TopbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  accessHome() {
    this.router.navigate(['']);
  }

  accessLogin() {
    this.router.navigate(['login']);
  }

  accesUsersEdit() {
    this.router.navigate(['users', 'edit']);
  }

}
