import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { StoreService } from '../../core/store/store.service';
import { User } from './model/user.model';
import { UsersComponent } from './users.component';

@Injectable()
export class UsersService extends StoreService<User> {

  constructor(public httpClient: HttpClient) {
    super(httpClient, environment.baseApi.host, UsersComponent.key);
  }

}
