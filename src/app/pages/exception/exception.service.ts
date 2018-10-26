
import { Injectable, Inject } from '@angular/core';
import { UsersService, IUsersQuery, IUsers } from '../../shared/service/users/users.service';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { BASE_URL } from '../../shared/service/const';

@Injectable()
export class ExceptionService {
    options: any;
    headers: Headers;
    constructor(
        private usersService: UsersService,
        private http: Http

    ) {
    }
    getUser(id: number) {
        return this.usersService.get({ id });
    }
    getUsersList(usersQuery?: IUsersQuery) {
        return this.usersService.query(usersQuery);
    }
    usersCreate(users: IUsers) {
        return this.usersService.create(users);
    }
    usersUpdate(users: IUsers) {
        return this.usersService.update(users);
    }
    usersDelete(id: number) {
        return this.usersService.remove({ id });
    }

}
