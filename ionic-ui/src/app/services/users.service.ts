import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private usersApi = `${environment.webApiUrl}/users`;

    constructor(private http: HttpClient) {
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(this.usersApi + '/register', user);
    }

    login(user: User): Observable<User> {
        return this.http.post<User>(this.usersApi + '/authenticate', user);
    }

    get(): Observable<User[]> {
        return this.http.get<User[]>(this.usersApi);
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(this.usersApi + '/' + id);
    }

    update(id: number, user: User): Observable<any> {
        return this.http.put<User>(this.usersApi + '/' + id, user);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<User>(this.usersApi + '/' + id);
    }
}
