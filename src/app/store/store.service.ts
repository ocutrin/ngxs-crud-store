import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class StoreService {

  private _url = `${this.host}/${this.url}`;

  constructor(public httpClient: HttpClient, private host: string, public url: string) { }

  search(): Observable<any> {
    return this.httpClient.get(this._url);
  }

  create(entity: any): Observable<any> {
    return this.httpClient.post(this._url, entity);
  }

  update(entity: any | any[]): Observable<any> {
    return this.httpClient.patch(this._url, entity);
  }

  delete(id: string | string[]): Observable<any> {
    return this.httpClient.delete(`${this._url}/${id}`);
  }

}
