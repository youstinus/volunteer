import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Volunteer} from '../models/Volunteer';
import {Observable} from 'rxjs';
import {Review} from '../models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewsApi = `${environment.webApiUrl}/volunteers`;

  constructor(private http: HttpClient) {
  }

  create(review: Review): Observable<Review> {
    return this.http.post<Review>(this.reviewsApi, review);
  }

  get(): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewsApi);
  }

  getById(id: number): Observable<Review> {
    return this.http.get<Review>(this.reviewsApi + '/' + id);
  }

  update(id: number, review: Review): Observable<any> {
    return this.http.put<Review>(this.reviewsApi + '/' + id, review);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Review>(this.reviewsApi + '/' + id);
  }
}
