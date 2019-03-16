import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../models/Project';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Review} from '../models/Review';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    private projectsApi = `${environment.webApiUrl}/projects`;

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Project[]> {
        const auth_token = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjMiLCJyb2xlIjoiT3JnYW5pemF0aW9uIiwibmJmIjoxNTUyMDU4OTA5LCJleHAiOjE1NTI2NjM3MDksImlhdCI6MTU1MjA1ODkwOX0.dfkr9qNyO5UJAW_pL0-Y8wQ_OyWp0mRnTWbOlUq8DZY';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': auth_token
        });
        return this.http.get<Project[]>(this.projectsApi, {headers: headers});
    }

    getById(id: number): Observable<Project> {
        const auth_token = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjMiLCJyb2xlIjoiT3JnYW5pemF0aW9uIiwibmJmIjoxNTUyMDU4OTA5LCJleHAiOjE1NTI2NjM3MDksImlhdCI6MTU1MjA1ODkwOX0.dfkr9qNyO5UJAW_pL0-Y8wQ_OyWp0mRnTWbOlUq8DZY';
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
    }
}
