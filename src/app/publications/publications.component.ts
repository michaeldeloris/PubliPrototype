import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Publication } from '../models/Publication';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.less']
})
export class PublicationsComponent implements OnInit, OnDestroy {

  @Input()
  user: User;

  publications: Array<Publication>;

  loadingData = true;
  message = '';
  reloadAttemps = 0;

  isAdmin = false;
  subscription: Subscription;

  constructor(private dataService: DataService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.dataService.getPublications().subscribe(
      next => {
        this.publications = next;
        if(this.user) {
          this.publications = this.publications.filter(publication => publication.author.id == this.user.id);
        }
        this.loadingData = false;
        this.message = '';
        this.sortByDate();
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

    this.subscription = this.authService.authenticationResultEvent.subscribe(
      next => {
        this.isAdmin = this.authService.role === 'ADMIN';
      }
    )
    this.authService.checkIfAlreadyAuthenticated();
  }

  sortByDate() {
    this.publications.sort((a, b) => new Date(b.getPublicationDateAsDate()).getTime() - new Date(a.getPublicationDateAsDate()).getTime())
  }

  accessPublication(id: number) {
    this.router.navigate(['publication'], {queryParams: {id}});
  }

  accessUserPage(id: number) {
    this.router.navigate(['users', 'detail'], {queryParams: {id}});
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
