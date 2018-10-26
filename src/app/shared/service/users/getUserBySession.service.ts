import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from '../const';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from '../ngx-resource';
import { QueryResults, IQuery } from '../interface';
import { auth } from '../auth-decorator';
export interface IUsers {
    id?: number;
    name?: string;
    roleId?: number;
    password?: string;
    permissionMap?: Map<string, string>;
}
@Injectable()
@ResourceParams({
    url: `${BASE_URL}/user/getUserBySessionId`
})
export class GetUserBySessionIdService extends Resource {

    @ResourceAction({
        path: '/{!id}',
        method: RequestMethod.Get
    })
    getUserBySessionId: ResourceMethod<{ id: any }, IUsers>;

    @ResourceAction({
        path: '/sendCode/{!id}',
        method: RequestMethod.Put
    })
    sendCode: ResourceMethod<IUsers, IUsers>;

    // @ResourceAction({
    //     path: '/sendCode/{!id}',
    //     method: RequestMethod.Get
    // })
    // sendCode: ResourceMethod<{ id: any }, IUsers>;

}
