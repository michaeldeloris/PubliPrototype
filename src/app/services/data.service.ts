import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publication } from '../models/Publication';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Message } from '../models/Message';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // PUBLICATIONS

  getPublications(): Observable<Array<Publication>> {
    return this.http.get<Array<Publication>>(environment.restUrl + '/publications')
      .pipe(
        map( data => {
          const publications = new Array<Publication>();
          for(let publication of data) {
            publications.push(Publication.fromHttp(publication));
          }
          return publications;
        })
      );
  }

  getPublication(id: number): Observable<Publication> {
    return this.http.get<Publication>(environment.restUrl + '/publications/' + id);
  }

  addPublication(newPublication: Publication): Observable<Publication> {
    return this.http.post<Publication>(environment.restUrl + '/publications', newPublication);
  }

  updatePublication(publication: Publication): Observable<Publication> {
    return this.http.put<Publication>(environment.restUrl + '/publications', publication);
  }

  deletePublication(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/publications/' + id);
  }

  // MESSAGES

  addMessage(publicationId: number, newMessage: Message): Observable<Publication> {
    return this.http.post<Publication>(environment.restUrl + '/messages/' + publicationId, newMessage).pipe(
      map(data => Publication.fromHttp(data))
    );
  }

  //USERS

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/users')
      .pipe(
        map( data => {
          const users = new Array<User>();
          for(let user of data) {
            users.push(User.fromHttp(user));
          }
          return users;
        })
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.restUrl + '/users/' + id)
      .pipe(
        map(data => User.fromHttp(data))
      );
  }

  validateUser(username: string, password: string): Observable<string> {
    const authData = btoa(`${username}:${password}`);
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + authData);
    return this.http.get<string>(environment.restUrl + '/basicAuth/validate', {headers: headers});
  }

  constructor(private http: HttpClient) { }
}
