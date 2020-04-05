import { Component, OnInit } from '@angular/core';
import { Publication } from '../models/Publication';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.less']
})
export class PublicationsComponent implements OnInit {

  publications: Array<Publication>;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.publications = this.dataService.publications;
  }

  addPublication() {
    this.router.navigate(['publication', 'add']);
  }

  editPublication(id: number) {
    this.router.navigate(['publication', 'edit'], {queryParams: {id}});
  }

}
