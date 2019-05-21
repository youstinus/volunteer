import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Organization} from '../models/Organization';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Project} from '../models/Project';
import {UsersService} from './users.service';
import {BaseService} from './base.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService extends BaseService<Organization> {
  public api = `${environment.webApiUrl}/organizations`;

  constructor(public http: HttpClient, public usersService: UsersService, public cookieService: CookieService) {
    super(http, usersService, cookieService);
  }

  getProjectsByOrganizationId(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(this.api + '/' + id + '/projects');
  }

  getByUserId(id: number): Observable<Organization> {
    const headers = this.getHeaders();
    return this.http.get<Organization>(this.api + '/user/' + id, {headers: headers});
  }
}
