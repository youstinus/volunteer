import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from '../utilities/JwtHelper';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private api = `${environment.webApiUrl}/users`;
    private user: User;
    private token: string;
    private role: number;
    private id: number;
    private helper = new JwtHelper();

    constructor(private http: HttpClient, private usersService: UsersService, private cookieService: CookieService) {
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

    public getTokenRole() {
        const cookieValue = this.cookieService.get('Bearer');
        const decoded = this.helper.decodeToken(cookieValue);
        return decoded.role;
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
        const data = this.helper.decodeToken(this.token);
        this.role = data.role;
        this.id = data.id;
        this.cookieService.delete('Bearer');
        this.cookieService.set('Bearer', this.token);
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

    logout(): Observable<any> {
        this.token = null;
        this.user = null;
        this.role = null;
        this.id = null;
        this.cookieService.delete('Bearer');
        return;
    }

    public get(): Observable<User[]> {
        const headers = this.getHeaders();
        return this.http.get<User[]>(`${this.api}`, { headers: headers });
    }

    public getById(id: number): Observable<User> {
        const headers = this.getHeaders();
        return this.http.get<User>(`${this.api}/${id}`, { headers: headers });
    }

    public update(id: number, item: User): Observable<any> {
        const headers = this.getHeaders();
        return this.http.put<User>(`${this.api}/${id}`, item, { headers: headers });
    }

    public delete(id: number): Observable<any> {
        const headers = this.getHeaders();
        return this.http.delete<User>(`${this.api}/${id}`, { headers: headers });
    }

    public getHeaders() {
        let auth_token = 'Bearer ';
        let token = this.usersService.getToken();
        const cookieValue = this.cookieService.get('Bearer');
        token = cookieValue;
        if (token != null) {
            auth_token = auth_token + token;
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': auth_token
        });
        return headers;
    }
}
