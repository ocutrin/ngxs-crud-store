import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { StoreCrudService } from '../../core/store-crud/store-crud.service';
import { User } from './model/user.model';

@Injectable()
export class UsersService extends StoreCrudService<User> {

    constructor(public httpClient: HttpClient) {
        super(httpClient, environment.baseApi.host, 'users');
    }

}
