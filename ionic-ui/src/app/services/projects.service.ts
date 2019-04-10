import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsersService } from './users.service';
import { BaseService } from './base.service';
import { Volunteer } from '../models/Volunteer';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService extends BaseService<Project> {
    public api = `${environment.webApiUrl}/projects`;

    constructor(public http: HttpClient, public usersService: UsersService) {
        super(http, usersService);
    }

    public getSavedItems(): Observable<Project[]> {
        const headers = this.getHeaders();
        return this.http.get<Project[]>(`${this.api}/saved`, { headers: headers });
    }

    public getSelectedItems(): Observable<Project[]> {
        const headers = this.getHeaders();
        return this.http.get<Project[]>(`${this.api}/selected`, { headers: headers });
    }

    public getVolunteers(id: number): Observable<Volunteer[]> {
        const headers = this.getHeaders();
        return this.http.get<Volunteer[]>(`${this.api}/` + id + `/volunteers`, { headers: headers });
    }
}
