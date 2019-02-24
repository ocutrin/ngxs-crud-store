import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { StoreService } from '../store/store.service';
import { UsersComponent } from './users.component';

@Injectable()
export class UsersService extends StoreService {

  constructor(public httpClient: HttpClient) {
    super(httpClient, environment.baseApi.host, UsersComponent.key);
  }

}
