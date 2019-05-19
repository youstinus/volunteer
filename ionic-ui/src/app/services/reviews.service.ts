import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Review} from '../models/Review';
import {UsersService} from './users.service';
import {BaseService} from './base.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService extends BaseService<Review> {
  public api = `${environment.webApiUrl}/reviews`;

  constructor(public http: HttpClient, public usersService: UsersService, public cookieService: CookieService) {
    super(http, usersService, cookieService);
  }
}

