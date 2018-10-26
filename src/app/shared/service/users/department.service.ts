import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from '../const';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from '../ngx-resource';
import { QueryResults, IQuery } from '../interface';
import { auth } from '../auth-decorator';

export interface IDepartmentQuery extends IQuery {
    id?: number;
    name?: string;
    pId?: number;
}

export interface IDepartment {
    id?: number;
    deptName?: string;
    pId?: number;
    childDeptName?: string;
}

@Injectable()
@ResourceParams({
    url: `${BASE_URL}/department`
})
export class DepartmentService extends Resource {
    @ResourceAction({
        path: '/{!id}',
        method: RequestMethod.Get
    })
    get: ResourceMethod<{ id: any }, IDepartment>;

    @ResourceAction({
        method: RequestMethod.Patch
    })
    query: ResourceMethod<IDepartmentQuery, QueryResults<IDepartment>>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IDepartment, IDepartment>;

    @ResourceAction({
        method: RequestMethod.Put,
        path: '/{!id}'
    })
    update: ResourceMethod<IDepartment, IDepartment>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    remove: ResourceMethod<{ id: any }, any>;


    create(data: IDepartment, callback?: (res: IDepartment) => any) {
        return this.save(data, callback);
    }

}
