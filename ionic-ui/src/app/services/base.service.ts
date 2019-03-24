import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersService} from './users.service';
import {Project} from '../models/Project';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<T> {

    private apiUrl = `${environment.webApiUrl}`;

    protected constructor(public http: HttpClient, public usersService: UsersService) {
    }

    public create(item: T, url: string): Observable<T> {
        const headers = this.getHeaders();
        return this.http.post<T>(`${this.apiUrl}/${url}`, item, {headers: headers});
    }

    public get(url: string): Observable<T[]> {
        const headers = this.getHeaders();
        return this.http.get<T[]>(`${this.apiUrl}/${url}`, {headers: headers});
    }

    public getById(id: number, url: string): Observable<T> {
        const headers = this.getHeaders();
        return this.http.get<T>(`${this.apiUrl}/${url}/${id}`, {headers: headers});
    }

    public update(id: number, item: T, url: string): Observable<any> {
        const headers = this.getHeaders();
        return this.http.put<T>(`${this.apiUrl}/${url}/${id}`, item, {headers: headers});
    }

    public delete(id: number, url: string): Observable<any> {
        const headers = this.getHeaders();
        return this.http.delete<T>(`${this.apiUrl}/${url}/${id}`, {headers: headers});
    }

    public getHeaders() {
        let auth_token = 'Bearer ';
        const token = this.usersService.getToken();
        if (token != null) {
            auth_token = auth_token + token;
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': auth_token
        });
        return headers;
    }
}
