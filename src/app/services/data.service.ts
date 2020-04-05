import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Message } from '../models/Message';
import { Publication } from '../models/Publication';
import { Observable, of } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  users: Array<User>;
  messages: Array<Message>;
  publications: Array<Publication>;

  getPublication(id: number): Observable<Publication> {
    return of(this.publications.find(publication => publication.id === id));
  }

  addPublication(newPublication: Publication): Observable<Publication> {
    let id = 0;
    for(let publication of this.publications) {
      if(publication.id > id) {
        id = publication.id;
      }
    }
    newPublication.id = id + 1;
    newPublication.publicationDate = formatDate(new Date(), 'dd/MM/yyyy', 'en-GB');
    newPublication.author = this.users.find(user => user.id === 1);
    this.publications.push(newPublication);
    return of(newPublication);
  }

  editPublication(publication: Publication): Observable<Publication> {
    const existingPublication = this.publications.find(p => p.id === publication.id);
    existingPublication.title = publication.title;
    existingPublication.content = publication.content;
    existingPublication.imagePath = publication.imagePath;
    return of(existingPublication);
  }

  deletePublication(id: number): Observable<any> {
    const publication = this.publications.find(p => p.id === id);
    this.publications.splice(this.publications.indexOf(publication),1);
    return of(null);
  }

  constructor() {
    this.users = new Array<User>();

    const user1 = new User();
    user1.username = 'Micky';
    user1.id = 1;
    this.users.push(user1);

    const user2 = new User();
    user2.username = 'Bibi';
    user2.id = 2;
    this.users.push(user2);

    this.messages = new Array<Message>();

    const message1 = new Message();
    message1.id = 1;
    message1.author = this.users.find(user => user.id === 1);
    message1.content = 'Le tout premier message !';
    message1.publicationDate = '04/04/2020';
    this.messages.push(message1);

    const message2 = new Message();
    message2.id = 2;
    message2.author = this.users.find(user => user.id === 1);
    message2.content = 'Cool cette publication';
    message2.publicationDate = '04/03/2020';
    this.messages.push(message2);

    const message3 = new Message();
    message3.id = 3;
    message3.author = this.users.find(user => user.id === 2);
    message3.content = 'J\'veux d\'la bière';
    message3.publicationDate = '20/03/2020';
    this.messages.push(message3);


    this.publications = new Array<Publication>();

    const publication1 = new Publication();
    publication1.id = 1;
    publication1.author = this.users.find(user => user.id === 1);
    publication1.title = 'Le titre de la première publication';
    publication1.content = 'Le contenu de la première publication !! Et la je remplis à la main car j\'ai la flemme d\'aller chercher le lorem ipsum sur internet';
    publication1.publicationDate = '04/04/2020';
    publication1.messages = this.messages;
    publication1.imagePath = 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg';
    this.publications.push(publication1);

    const publication2 = new Publication();
    publication2.id = 2;
    publication2.author = this.users.find(user => user.id === 2);
    publication2.title = 'Autre publi';
    publication2.content = 'Publi plus légère en terme de contenu';
    publication2.publicationDate = '04/04/2020';
    this.publications.push(publication2);
  }
}
