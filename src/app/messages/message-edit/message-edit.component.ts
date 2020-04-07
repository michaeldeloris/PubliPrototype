import { Message } from './../../models/Message';
import { DataService } from 'src/app/services/data.service';
import { Publication } from './../../models/Publication';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.less']
})
export class MessageEditComponent implements OnInit {

  @Input()
  publication: Publication;

  message: Message;

  statusMessage = '';

  isContentValid = false;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.message = new Message();
    this.checkIfContentIsValid();
  }

  checkIfContentIsValid() {
    if(this.message.content) {
      this.isContentValid =  this.message.content.trim().length > 0;
    } else {
      this.isContentValid =  false;
    }
  }

  onSubmit() {
    const fakeUser = new User();
    fakeUser.id = 666;
    fakeUser.username = 'fake_user';
    this.message.author = fakeUser;
    this.message.publicationDate = new Date().toString();
    this.publication.messages.push(this.message);
    this.dataService.updatePublication(this.publication).subscribe(
      next => this.router.navigate(['publications'], {queryParams: {id : next.id}}),
      error => this.statusMessage = 'Impossible d\'enregistrer le nouveau message... Réessayez plus tard.'
    );
  }
}
