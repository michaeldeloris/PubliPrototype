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

  loadingData = true;
  message = '';

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getPublications().subscribe(
      next => {
        this.publications = next;
        this.loadingData = false;
      },
      error => {
        this.message = 'Connexion interrompue avec le serveur.';
      }
    );
  }

  addPublication() {
    this.router.navigate(['publication', 'add']);
  }

  editPublication(id: number) {
    this.router.navigate(['publication', 'edit'], {queryParams: {id}});
  }

  deletePublication(id: number) {
    const result = confirm('Vous allez supprimer cette publication');
    if(result) {
      this.dataService.deletePublication(id).subscribe(
        next => this.router.navigate([''])
      )
    }
  }
}
