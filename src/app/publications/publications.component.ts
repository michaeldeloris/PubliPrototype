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
  reloadAttemps = 0;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getPublications().subscribe(
      next => {
        this.publications = next;
        this.loadingData = false;
      },
      error => {
        this.reloadAttemps++;
        if(this.reloadAttemps <= 10) {
          this.message = 'Connexion interrompue avec le serveur. Tentative de reconnexion en cours...';
          this.loadData();
        } else {
          this.message = 'Les tentatives de connexion ont échouées. Veuillez contacter un administrateur.';
        }
      }
    );
  }

  accessPublication(id: number) {
    this.router.navigate(['publication'], {queryParams: {id}});
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
        next => this.loadData()
      )
    }
  }
}
