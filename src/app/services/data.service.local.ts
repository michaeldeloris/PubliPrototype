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

  validateUser(username: string, password: string): Observable<{result: string}> {
    return of({result: 'ok'});
  }


  getRole(): Observable<{role: string}> {
    return of({role: 'ADMIN'});
  }

  constructor() { }
}
