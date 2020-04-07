import { ActivatedRoute } from '@angular/router';
import { Publication } from './../../models/Publication';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.less']
})
export class PublicationDetailsComponent implements OnInit {

  publication: Publication;

  message = '';

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const id = this.route.snapshot.queryParams['id'];
    if(id) {
      this.dataService.getPublication(+id).subscribe(
        next => this.publication = next,
        error => this.message = "Cette publication n'existe pas !"
      );
    }

  }

}
