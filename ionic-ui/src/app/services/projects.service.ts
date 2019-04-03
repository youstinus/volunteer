import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../models/Project';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Review} from '../models/Review';
import {UsersService} from './users.service';
import {BaseService} from './base.service';

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
        return this.http.get<Project[]>(`${this.api}`, {headers: headers});
    }

    public getSelectedItems(): Observable<Project[]> {
        const headers = this.getHeaders();
        return this.http.get<Project[]>(`${this.api}`, {headers: headers});
    }

    /*getAll(): Observable<Project[]> {
        const auth_token = 'Bearer ';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': auth_token
        });
        return this.http.get<Project[]>(this.projectsApi, {headers: headers});
    }

    getById(id: number): Observable<Project> {
        const auth_token = 'Bearer ';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': auth_token
        });
        return this.http.get<Project>(this.projectsApi + '/' + id, {headers: headers});
    }

    create(project: Project): Observable<Review> {
        return this.http.post<Review>(this.projectsApi, project);
    }

    update(id: number, project: Project): Observable<any> {
        return this.http.put<Review>(this.projectsApi + '/' + id, project);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<Review>(this.projectsApi + '/' + id);
    }*/
}
