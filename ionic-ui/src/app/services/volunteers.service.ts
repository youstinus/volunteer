import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Volunteer} from '../models/Volunteer';
import {UsersService} from './users.service';
import {BaseService} from './base.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService extends BaseService<Volunteer> {

  public api = `${environment.webApiUrl}/volunteers`;

  constructor(public http: HttpClient, public usersService: UsersService, public cookieService: CookieService) {
    super(http, usersService, cookieService);
  }

  // returns 400 all the time
  getByUsersId(id: number): Observable<Volunteer> {
    const headers = this.getHeaders();
    return this.http.get<Volunteer>(this.api + '/' + id, {headers: headers});
  }
}
