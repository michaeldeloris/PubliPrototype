import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Publication } from 'src/app/models/Publication';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Subscription} from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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

  loadingData = true;

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '250px',
    toolbarHiddenButtons: [
      ['insertImage']
    ]
  };

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loadData();
    this.dataLoadedSubscription = this.dataLoadedEvent.subscribe(
      next => {
        this.initializeForm();
        this.loadingData = false;
      }

    )
  }

  ngOnDestroy() {
    this.dataLoadedSubscription.unsubscribe();
  }

  loadData() {
    const id = this.route.snapshot.queryParams['id'];
    if(id) {
      this.dataService.getPublication(+id).subscribe(
        next => {
              this.publication = next;
              this.dataLoadedEvent.emit();
        }
        );
      } else {
        this.dataService.getCurrentUser().subscribe(
          next => {
            this.publication = new Publication();
            this.publication.author = next;
            this.loadingData = false;
          });
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
