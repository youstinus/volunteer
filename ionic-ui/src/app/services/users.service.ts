import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {JwtHelper} from '../utilities/JwtHelper';

@Injectable({
    providedIn: 'root'
})
export class UsersService extends BaseService<User> {
    public api = `${environment.webApiUrl}/users`;
    private user: User;
    private token: string;
    private role: number;
    private id: number;

    constructor(public http: HttpClient, public usersService: UsersService) {
        super(http, usersService);
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

    create(item: User): Observable<User> {
        return null; // super.create(item, url);
    }
}
