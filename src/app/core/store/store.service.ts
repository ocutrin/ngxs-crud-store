import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreEntity } from './store-entity.model';


@Injectable()
export class StoreService<T extends StoreEntity> {

  private _url = `${this.host}/${this.url}`;

  constructor(public httpClient: HttpClient, private host: string, public url: string) { }

  search(): Observable<T[]> {
    return this.httpClient.get<T[]>(this._url);
  }

  create(entity: T): Observable<T> {
    return this.httpClient.post<T>(this._url, entity);
  }

  update(entity: T): Observable<T> {
    console.log(entity);
    return this.httpClient.patch<T>(`${this._url}/${entity.id}`, entity);
  }

  delete(id: string): Observable<T> {
    return this.httpClient.delete<T>(`${this._url}/${id}`);
  }

}
