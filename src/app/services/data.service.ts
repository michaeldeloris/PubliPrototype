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
    return this.http.get<Array<Publication>>(environment.restUrl + '/api/publications')
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
    return this.http.get<Publication>(environment.restUrl + '/api/publications/' + id);
  }

  addPublication(newPublication: Publication): Observable<Publication> {
    return this.http.post<Publication>(environment.restUrl + '/api/publications', newPublication, {withCredentials: true});
  }

  updatePublication(publication: Publication): Observable<Publication> {
    return this.http.put<Publication>(environment.restUrl + '/api/publications', publication, {withCredentials: true});
  }

  deletePublication(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/publications/' + id, {withCredentials: true});
  }

  // MESSAGES

  addMessage(publicationId: number, newMessage: Message): Observable<Publication> {
    return this.http.post<Publication>(environment.restUrl + '/api/messages/' + publicationId, newMessage, {withCredentials: true}).pipe(
      map(data => Publication.fromHttp(data))
    );
  }

  //USERS

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users', {withCredentials: true})
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
    return this.http.get<User>(environment.restUrl + '/api/users/' + id)
      .pipe(
        map(data => User.fromHttp(data))
      );
  }

  addUser(newUser: User, password: string) : Observable<User> {
    const fullUser = {id: newUser.id, username: newUser.username, password: password};
    return this.http.post<User>(environment.restUrl + '/api/users', fullUser, {withCredentials : true});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/users/'+ id, {withCredentials : true});
  }

  validateUser(username: string, password: string): Observable<{result: string}> {
    const authData = btoa(`${username}:${password}`);
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + authData)
                                     .append('X-Requested-With', 'XMLHttpRequest ');
    return this.http.get<{result: string}>(environment.restUrl + '/api/basicAuth/validate', {headers, withCredentials: true});
  }

  getUsername():Observable<{username: string}> {
    const headers = new HttpHeaders().append('X-Requested-With', 'XMLHttpRequest');
    return this.http.get<{username: string}>(environment.restUrl + '/api/userInfo/currentUserName', {headers, withCredentials: true})
  }

  getRole(): Observable<{role: string}> {
    const headers = new HttpHeaders().append('X-Requested-With', 'XMLHttpRequest');
    return this.http.get<{role: string}>(environment.restUrl + '/api/userInfo/currentUserRole', {headers, withCredentials: true});
  }

  logout(): Observable<string> {
    return this.http.get<string>(environment.restUrl + '/api/basicAuth/logout', {withCredentials: true});
  }

  constructor(private http: HttpClient) { }
}
