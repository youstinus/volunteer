import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Review} from '../models/Review';
import {UsersService} from './users.service';
import {BaseService} from './base.service';
import { CookieService } from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {Project} from '../models/Project';
import {Organization} from '../models/Organization';
import ReadWriteStream = NodeJS.ReadWriteStream;
import {Volunteer} from '../models/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService extends BaseService<Review> {
  public api = `${environment.webApiUrl}/reviews`;

  constructor(public http: HttpClient, public usersService: UsersService, public cookieService: CookieService) {
    super(http, usersService, cookieService);
  }

  getReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.api + '/' + id +  '/organization');
  }
  getVolunteerById(id: number): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.api + '/'+ id + `/volunteers`);
  }

}

