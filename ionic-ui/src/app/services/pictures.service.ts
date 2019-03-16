import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Picture} from '../models/Picture';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {
  private picturesApi = `${environment.webApiUrl}/pictures`;

  constructor(private http: HttpClient) {
  }

  create(picture: Picture): Observable<Picture> {
    return this.http.post<Picture>(this.picturesApi, picture);
  }

  get(): Observable<Picture[]> {
    return this.http.get<Picture[]>(this.picturesApi);
  }

  getById(id: number): Observable<Picture> {
    return this.http.get<Picture>(this.picturesApi + '/' + id);
  }

  update(id: number, picture: Picture): Observable<any> {
    return this.http.put<Picture>(this.picturesApi + '/' + id, picture);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Picture>(this.picturesApi + '/' + id);
  }
}
