import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from '../utilities/JwtHelper';
import { CookieService } from 'ngx-cookie-service';
import SimpleCrypto from '../utilities/SimpleCrypto';
import { Strings } from '../constants/Strings';
//import SimpleCrypto from 'simple-crypto-js';

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
    //private secretPass = 's6v=e4d6%)2g.;5v/'; // todo put to environment variables
    //private simpleCrypto = new SimpleCrypto(this.secretPass);

    constructor(private http: HttpClient, private cookieService: CookieService) {
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

    getTokenRoleIndex() {
        const role = this.getTokenRole();
        if (role == 'Volunteer') {
            return 2;
        } else if (role == 'Organization') {
            return 3;
        } else if (role == 'Moderator') {
            return 1;
        } else if (role == 'Admin') {
            return 0;
        } else {
            return 4;
        }
    }

    public getTokenId() {
        const cookieValue = this.cookieService.get('Bearer');
        const decoded = this.helper.decodeToken(cookieValue);
        return +decoded.unique_name;
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
        this.cookieService.delete('Bearer', '/');
        this.cookieService.delete('Bearer', '.');
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
        this.cookieService.delete('Bearer', '/');
        this.cookieService.delete('Bearer', '.'); // todo whitch to use
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
        let token = this.getToken();
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

    // remove. cannot be used inside front-end
    /*public decodeResetMail(encrypted: string) {
        let message = atob(encrypted);  
        let decrypted = this.decrypt2(message).toString();
        return decrypted;
    }*/

    public encodeResetMail(email: string) {
        return btoa(this.encrypt2(email).toString());
    }

    public updateByEmail(email: string, passwords: any): Observable<any> {
        const headers = this.getHeaders();
        return this.http.put<User>(`${this.api}/email/${email}`, { password: passwords.password }, { headers: headers });
    }

    public updateLoggedInUser(passwords: any): Observable<any> {
        const headers = this.getHeaders();
        return this.http.put<User>(`${this.api}/signed`, { password: passwords.password, token: passwords.oldPassword }, { headers: headers });
    }

    /*public encryptNodeJs(email: string) {
        var crypto = require('crypto-js');
        var key = 's7^(v(WMjOi.mI387OPfYTcy.SWbX7zy'; //replace with your key
        var iv = '#yH2*m14v8((5kBQ'; //replace with your IV
        var cipher = crypto.createCipheriv('aes256', key, iv)
        var crypted = cipher.update(email, 'utf8', 'base64')
        crypted += cipher.final('base64');
        return crypted;
    }

    public encrypt(text: string) {
        var crypto = require('crypto-js');
        var alg = 'des-ede-cbc';
        var key = new Buffer('s7^(v(WMjOi.mI387OPfYTcy.SWbX7zy', 'utf-8');
        var iv = new Buffer('#yH2*m14v8((5kBQ', 'base64');    //This is from c# cipher iv

        var cipher = crypto.createCipheriv(alg, key, iv);
        var encoded = cipher.update(text, 'ascii', 'base64');
        encoded += cipher.final('base64');

        return encoded;
    }

    public decrypt(encryptedText: string) {
        var crypto = require('crypto-js');
        var alg = 'des-ede-cbc';
        var key = new Buffer('s7^(v(WMjOi.mI387OPfYTcy.SWbX7zy', 'utf-8');
        var iv = new Buffer('#yH2*m14v8((5kBQ', 'base64');    //This is from c# cipher iv

        var encrypted = new Buffer(encryptedText, 'base64');
        var decipher = crypto.createDecipheriv(alg, key, iv);
        var decoded = decipher.update(encrypted, 'binary', 'ascii');
        decoded += decipher.final('ascii');

        return decoded;
    }*/


    public encrypt2(text) {
        var CryptoJS = require("crypto-js");
        var key = CryptoJS.enc.Utf8.parse(Strings.Encryption_Key);
        var iv = CryptoJS.enc.Utf8.parse(Strings.Encryption_Iv);
        var encoded = CryptoJS.enc.Utf8.parse(text);
        var ciphertext = CryptoJS.TripleDES.encrypt(encoded, key, { mode: CryptoJS.mode.CBC, iv: iv });

        return ciphertext.toString();
    }

    /*public decrypt2(encryptedText) {
        var CryptoJS = require("crypto-js");
        var key = CryptoJS.enc.Utf8.parse('J0bg8HQ8InMZl&yZWFq18nMl');
        var iv = CryptoJS.enc.Utf8.parse('giK0vwUC');
        var bytes = CryptoJS.TripleDES.decrypt(encryptedText, key, { mode: CryptoJS.mode.CBC, iv: iv });
        var decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        return decryptedText;
    }*/
}
