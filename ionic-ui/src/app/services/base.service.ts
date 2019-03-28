import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersService} from './users.service';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<T> {

    public api = `${environment.webApiUrl}`;

    protected constructor(public http: HttpClient, public usersService: UsersService) {
    }

    public create(item: T): Observable<T> {
        const headers = this.getHeaders();
        return this.http.post<T>(`${this.api}`, item, {headers: headers});
    }

    public get(): Observable<T[]> {
        const headers = this.getHeaders();
        return this.http.get<T[]>(`${this.api}`, {headers: headers});
    }

    public getById(id: number): Observable<T> {
        const headers = this.getHeaders();
        return this.http.get<T>(`${this.api}/${id}`, {headers: headers});
    }

    public update(id: number, item: T): Observable<any> {
        const headers = this.getHeaders();
        return this.http.put<T>(`${this.api}/${id}`, item, {headers: headers});
    }

    public delete(id: number): Observable<any> {
        const headers = this.getHeaders();
        return this.http.delete<T>(`${this.api}/${id}`, {headers: headers});
    }

    public getHeaders() {
        let auth_token = 'Bearer ';
        const token = this.usersService.getToken();
        console.log(token);
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
