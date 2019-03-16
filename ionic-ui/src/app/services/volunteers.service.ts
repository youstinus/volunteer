import { Injectable } from '@angular/core';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Volunteer} from '../models/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {
  private volunteersApi = `${environment.webApiUrl}/volunteers`;

  constructor(private http: HttpClient) {
  }

  create(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.post<Volunteer>(this.volunteersApi, volunteer);
  }

  get(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.volunteersApi);
  }

  getById(id: number): Observable<Volunteer> {
    return this.http.get<Volunteer>(this.volunteersApi + '/' + id);
  }

  update(id: number, volunteer: Volunteer): Observable<any> {
    return this.http.put<Volunteer>(this.volunteersApi + '/' + id, volunteer);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Volunteer>(this.volunteersApi + '/' + id);
  }
}
