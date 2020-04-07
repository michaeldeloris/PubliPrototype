import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publication } from '../models/Publication';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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

  constructor(private http: HttpClient) { }
}
