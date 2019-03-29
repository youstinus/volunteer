import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Organization} from '../models/Organization';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Project} from '../models/Project';
import {UsersService} from './users.service';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService extends BaseService<Organization> {
  public api = `${environment.webApiUrl}/organizations`;

  constructor(public http: HttpClient, public usersService: UsersService) {
    super(http, usersService);
  }

  getProjectsByOrganizationId(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(this.api + '/' + id + '/projects');
  }
}
