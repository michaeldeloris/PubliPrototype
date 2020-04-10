import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from './../../models/Publication';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.less']
})
export class PublicationDetailsComponent implements OnInit {

  publication: Publication;

  message = '';

  loadingData = true;

  isAdmin = false;

  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadData();

    this.subscription = this.authService.authenticationResultEvent.subscribe(
      next => {
        this.isAdmin = this.authService.role === 'ADMIN';
      }
    )
    this.authService.checkIfAlreadyAuthenticated();
  }

  loadData() {
    const id = this.route.snapshot.queryParams['id'];
    if(id) {
      this.dataService.getPublication(+id).subscribe(
        next => {
          this.publication = next;
          this.loadingData = false;
          this.message = '';
        },
        error => this.message = "Cette publication n'existe pas !"
      );
    }
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
