import { Component, OnInit, Input } from '@angular/core';
import { Publication } from 'src/app/models/Publication';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.less']
})
export class PublicationEditComponent implements OnInit {

  publication: Publication;

  dataLoaded = false;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];
    if(id) {
      this.dataService.getPublication(+id).subscribe(
        next => {
          this.publication = next;
          this.dataLoaded = true;
        }
        );
      } else {
        this.publication = new Publication();
        this.dataLoaded = true;
    }
  }

  onSubmit() {
    if(this.publication.id != null) {
      this.dataService.editPublication(this.publication).subscribe(
        next => this.router.navigate([''])
      )
    } else {
      this.dataService.addPublication(this.publication).subscribe(
        next => this.router.navigate(['']) // TODO : manage error
      );
    }
  }
}
