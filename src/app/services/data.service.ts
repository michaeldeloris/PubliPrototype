import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publication } from '../models/Publication';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getPublications(): Observable<Array<Publication>> {
    console.log(environment.restUrl + '/publications');
    return this.http.get<Array<Publication>>(environment.restUrl + '/publications');
  }

  getPublication(id: number): Observable<Publication> {
    return of(null);
  }

  addPublication(newPublication: Publication): Observable<Publication> {
    return of(null);
  }

  editPublication(publication: Publication): Observable<Publication> {
    return of(null);
  }

  deletePublication(id: number): Observable<any> {
    return of(null);
  }

  constructor(private http: HttpClient) { }
}
