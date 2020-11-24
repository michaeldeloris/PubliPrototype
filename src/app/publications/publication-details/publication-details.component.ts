import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from './../../models/Publication';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.less']
})
export class PublicationDetailsComponent implements OnInit, OnDestroy {

  publication: Publication;

  message = '';

  loadingData = true;

  ownedByUser = false;
  isAdmin = false;

  roleSubscription: Subscription;
  usernameSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadData();
    this.roleSubscription = this.authService.authenticationResultEvent.subscribe(
      next => {
        this.isAdmin = this.authService.role === 'ADMIN';
      }
    )
    this.authService.checkIfAlreadyAuthenticated();
  }

  ngOnDestroy() {
    if(this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
    if(this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }

  loadData() {
    const id = this.route.snapshot.queryParams['id'];
    if(id) {
      this.dataService.getPublication(+id).subscribe(
        next => {
          this.publication = next;
          this.loadingData = false;
          this.message = '';
          this.compareAuthorAndCurrentUser();
        },
        error => this.message = "Cette publication n'existe pas !"
      );
    }
  }

  compareAuthorAndCurrentUser() {
    this.usernameSubscription = this.authService.usernameSetEvent.subscribe(
      next => {
        this.ownedByUser = this.authService.username === this.publication.author.username;
      }
    )
    this.authService.setUpUsername();
  }

  accessUserPage(id: number) {
    this.router.navigate(['users', 'detail'], {queryParams: {}});
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
