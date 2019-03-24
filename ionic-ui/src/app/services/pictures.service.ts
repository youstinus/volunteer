import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Picture} from '../models/Picture';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PicturesService extends BaseService<Picture> {
  public api = `${environment.webApiUrl}/pictures`;

  constructor(public http: HttpClient, public usersService: UsersService) {
    super(http, usersService);
  }

  /*create(picture: Picture): Observable<Picture> {
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
  }*/
}
