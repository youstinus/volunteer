import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Picture} from '../models/Picture';
import {BaseService} from './base.service';
import {UsersService} from './users.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PicturesService extends BaseService<Picture> {
  public api = `${environment.webApiUrl}/pictures`;

  constructor(public http: HttpClient, public usersService: UsersService, public cookieService: CookieService) {
    super(http, usersService, cookieService);
  }
}
