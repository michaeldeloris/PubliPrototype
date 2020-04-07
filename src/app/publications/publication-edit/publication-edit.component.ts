import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Publication } from 'src/app/models/Publication';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Subscription} from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.less']
})
export class PublicationEditComponent implements OnInit, OnDestroy {

  publication: Publication;

  dataLoadedEvent = new EventEmitter();
  dataLoadedSubscription = new Subscription();

  isTitleValid = false;
  isContentValid= false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '250px',
    toolbarHiddenButtons: [
      ['insertImage']
    ]
  };

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
    this.dataLoadedSubscription = this.dataLoadedEvent.subscribe(
      next => this.initializeForm()
    )
  }

  ngOnDestroy() {
    this.dataLoadedSubscription.unsubscribe();
  }

  loadData() {
    const id = this.route.snapshot.queryParams['id'];
    if(id) {
      this.dataService.getPublications().subscribe(
        next => {
          for(let publication of next) {
            if(publication.id === +id) {
              this.publication = publication;
              this.dataLoadedEvent.emit();
            }
          }
        }
        );
      } else {
        this.publication = new Publication();
    }
  }

  initializeForm() {
    this.checkIfTitleIsValid();
    this.checkIfContentIsValid();
  }

  checkIfTitleIsValid() {
    if(this.publication.title) {
      this.isTitleValid = this.publication.title.trim().length > 0;
    } else {
      this.isTitleValid = false;
    }
  }

  checkIfContentIsValid() {
    if(this.publication.content) {
      this.isContentValid = this.publication.content.trim().length > 0;
    } else {
      this.isContentValid = false;
    }
  }

  onSubmit() {
    if(this.publication.id != null) {
      this.dataService.updatePublication(this.publication).subscribe(
        next => this.router.navigate([''])
      )
    } else {
      this.dataService.addPublication(this.publication).subscribe(
        next => this.router.navigate(['']) // TODO : manage error
      );
    }
  }
}
