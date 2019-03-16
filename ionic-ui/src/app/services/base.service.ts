import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  private apiUrl = `${environment.webApiUrl}`;

  constructor(private http: HttpClient) {
  }

  create(item: T, url: string): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${url}`, item);
  }

  get(url: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${url}`);
  }

  getById(id: number, url: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${url}/${id}`);
  }

  update(id: number, item: T, url: string): Observable<any> {
    return this.http.put<T>(`${this.apiUrl}/${url}/${id}`, item);
  }

  delete(id: number, url: string): Observable<any> {
    return this.http.delete<T>(`${this.apiUrl}/${url}/${id}`);
  }
}
