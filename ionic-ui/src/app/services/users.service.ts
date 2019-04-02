import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from '../utilities/JwtHelper';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public api = `${environment.webApiUrl}/users`;
    private user: User;
    private token: string;
    private role: number;
    private id: number;

    constructor(public http: HttpClient, public usersService: UsersService) {
    }

    public getUserToken() {
        if (this.user != null) {
            return this.user.token;
        } else {
            return null;
        }
    }

    public getRole() {
        return this.role;
    }

    public getId() {
        return this.id;
    }

    public getUser() {
        return this.user;
    }

    public setUser(user: User) {
        this.user = user;
        this.token = user.token;
        const helper = new JwtHelper();
        const data = helper.decodeToken(this.token);
        this.role = data.role;
        this.id = data.id;
    }

    public getToken() {
        return this.token;
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(this.api + '/register', user);
    }

    login(user: User): Observable<User> {
        return this.http.post<User>(this.api + '/authenticate', user);
    }

    public get(): Observable<User[]> {
        const headers = this.getHeaders();
        return this.http.get<User[]>(`${this.api}`, {headers: headers});
    }

    public getById(id: number): Observable<User> {
        const headers = this.getHeaders();
        return this.http.get<User>(`${this.api}/${id}`, {headers: headers});
    }

    public update(id: number, item: User): Observable<any> {
        const headers = this.getHeaders();
        return this.http.put<User>(`${this.api}/${id}`, item, {headers: headers});
    }

    public delete(id: number): Observable<any> {
        const headers = this.getHeaders();
        return this.http.delete<User>(`${this.api}/${id}`, {headers: headers});
    }

    public getHeaders() {
        let auth_token = 'Bearer ';
        const token = this.usersService.getToken();
        if (token != null) {
            auth_token = auth_token + token;
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': '*',
            'Authorization': auth_token
        });
        return headers;
    }
}
