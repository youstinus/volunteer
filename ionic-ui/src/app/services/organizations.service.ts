import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Organization} from '../models/Organization';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Project} from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private projectsApi = `${environment.webApiUrl}/organizations`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Organization[]> {
    const auth_token = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjMiLCJyb2xlIjoiT3JnYW5pemF0aW9uIiwibmJmIjoxNTUyMDU4OTA5LCJleHAiOjE1NTI2NjM3MDksImlhdCI6MTU1MjA1ODkwOX0.dfkr9qNyO5UJAW_pL0-Y8wQ_OyWp0mRnTWbOlUq8DZY';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': auth_token
    });
    return this.http.get<Organization[]>(this.projectsApi, {headers: headers});
  }

  getById(id: number): Observable<Organization> {
    const auth_token = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjMiLCJyb2xlIjoiT3JnYW5pemF0aW9uIiwibmJmIjoxNTUyMDU4OTA5LCJleHAiOjE1NTI2NjM3MDksImlhdCI6MTU1MjA1ODkwOX0.dfkr9qNyO5UJAW_pL0-Y8wQ_OyWp0mRnTWbOlUq8DZY';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': auth_token
    });
    return this.http.get<Organization>(this.projectsApi + '/' + id, {headers: headers});
  }

}
