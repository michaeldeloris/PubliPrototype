import { Component, OnInit } from '@angular/core';
import { Publication } from '../models/Publication';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.less']
})
export class PublicationsComponent implements OnInit {

  publications: Array<Publication>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.publications = this.dataService.publications;
  }

}
