import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from '../const';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from '../ngx-resource';
import { QueryResults, IQuery } from '../interface';
import { auth } from '../auth-decorator';
import { GetUserBySessionIdService } from './getUserBySession.service';

export interface IUsersQuery extends IQuery {
  id?: number;
  name?: string;
  roleId?: number;
  deptId?: number;
  phoneNumber?: string;
}

export interface IUsers {
  id?: number;
  name?: string;
  deptId?: number;
  roleId?: number;
  password?: string;
  nikeName?: string;
  phoneNumber?: string;
  verifyCode?: string;
  permissionMap?: Map<string, string>;
  isStudent?: boolean;
  isTearch?: boolean;
  userType?: string;
  teacherId?: number;
  studentId?: number;
  wechatOpenId?: String;

}

@Injectable()
@ResourceParams({
  url: `${BASE_URL}/user`
})
export class UsersService extends Resource {

  @ResourceAction({
    method: RequestMethod.Patch
  })
  query: ResourceMethod<IUsersQuery, QueryResults<IUsers>>;

  @ResourceAction({
    path: '/{!id}',
    method: RequestMethod.Get
  })
  get: ResourceMethod<{ id: any }, IUsers>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<IUsers, IUsers>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!id}'
  })
  update: ResourceMethod<IUsers, IUsers>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  remove: ResourceMethod<{ id: any }, any>;


  create(data: IUsers, callback?: (res: IUsers) => any) {
    return this.save(data, callback);
  }

  cuser(): Observable<IUsers> {

    return this.http.post(`${BASE_URL}/users/us`, {
      // name: 'username', password: 'password'
    })
      .map((response) => response.json());
  }

  sendCode(id: number): Observable<IUsers> {

    return this.http.post(`${BASE_URL}/user/sendCode`, {
      id: id
    })
      .map((response) => response.json());
  }
}
