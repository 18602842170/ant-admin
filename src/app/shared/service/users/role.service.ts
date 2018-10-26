import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from '../const';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from '../ngx-resource';
import { QueryResults, IQuery } from '../interface';

export interface IRoleQuery extends IQuery {
    id?: number;
    name?: string;
}

export interface IRole {
    id?: number;
    name?: string;
    num?: string;
    permissionMap?: Map<string, string>;
    roleList?: Map<string, string>;
    test?: any[];
}

@Injectable()
@ResourceParams({
    url: `${BASE_URL}/role`
})
export class RoleService extends Resource {
    @ResourceAction({
        path: '/{!id}',
        method: RequestMethod.Get
    })
    get: ResourceMethod<{ id: any }, IRole>;

    @ResourceAction({
        method: RequestMethod.Patch
    })
    query: ResourceMethod<IRoleQuery, QueryResults<IRole>>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IRole, IRole>;

    @ResourceAction({
        method: RequestMethod.Put,
        path: '/{!id}'
    })
    update: ResourceMethod<IRole, IRole>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    remove: ResourceMethod<{ id: any }, any>;

    create(data: IRole, callback?: (res: IRole) => any) {
        return this.save(data, callback);
      }
}
