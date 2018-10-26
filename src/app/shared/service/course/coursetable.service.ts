import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { BASE_URL} from '../const';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from '../ngx-resource';
import { QueryResults, IQuery } from '../interface';

export interface ICoursetableQuery extends IQuery {
    grade?: string;
    courseSubject?: string;
    courseName?: string;
    mon?: string;
    tues?: string;
    wed?: string;
    thur?: string;
    fri?: string;
    sat?: string;
    sun?: string;
    gradeId?: number;
  }

  export interface ICoursetable {
    grade?: string;
    courseSubject?: string;
    courseName?: string;
    mon?: string;
    tues?: string;
    wed?: string;
    thur?: string;
    fri?: string;
    sat?: string;
    sun?: string;
    gradeId?: number;
  }


  @Injectable()
  @ResourceParams({
    url: `${BASE_URL}/course_table`
  })
 export class CoursetableService extends Resource {

    @ResourceAction({
        method: RequestMethod.Patch
      })
      query: ResourceMethod<ICoursetableQuery, QueryResults<ICoursetableQuery>>;

 }
