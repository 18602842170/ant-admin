import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from '../const';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from '../ngx-resource';
import { QueryResults, IQuery } from '../interface';
import { auth } from '../auth-decorator';
import { WSAVERNOTSUPPORTED } from 'constants';
import { Timestamp } from 'rxjs/operators/timestamp';

export interface ICoursereserveQuery extends IQuery {
    id?: number;
    courseId?: number;
    reserveCode?: string;
    phoneNumber?: string;
    courseName?: string;
  }

  export interface ICoursereserve {
    id?: number;
    courseId?: number;
    reserveCode?: string;
    phoneNumber?: string;
    courseName?: string;
  }


  @Injectable()
  @ResourceParams({
    url: `${BASE_URL}/course_reserve`
  })
 export class CoursereserveService extends Resource {

    @ResourceAction({
        method: RequestMethod.Patch
      })
      query: ResourceMethod<ICoursereserveQuery, QueryResults<ICoursereserveQuery>>;

 }
