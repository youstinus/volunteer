import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../models/Project';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    private projectsApi = `${environment.webApiUrl}/projects`;

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Project[]> {
        return this.http.get<Project[]>(this.projectsApi);
    }
}
