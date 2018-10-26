import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from '../const';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from '../ngx-resource';
import { QueryResults, IQuery } from '../interface';
import { auth } from '../auth-decorator';
import { WSAVERNOTSUPPORTED } from 'constants';
import { Timestamp } from 'rxjs/operators/timestamp';

export interface ICourseQuery extends IQuery {
    id?: number;
    name?: string;
    gradeId?: number;
    subjectId?: number;
  }

  export interface ICourse {
    id?: number;
    name?: string;
    gradeId?: number;
    subjectId?: number;
    classesNumber?: number;
    payNumber?: number;
    appointmentNumber?: number;
    courseNumber?: number;
    userId?: number;
    classroomId?: number;
    price?: number;
    fine?: boolean;
    backImageUrl?: string;
    year?: string;
    gradeClassId?: number;
  }


  export interface ICourseClass {
    isRepeat?: string;
    gradeId?: number;
    startTime?: string;
    endTime?: string;
    courseId?: number;
    courseDay?: Date;
    dayArray?: string[];
    courseNumber?: string;
    userId?: number;
  }



  @Injectable()
  @ResourceParams({
    url: `${BASE_URL}/course`
  })
 export class CoursesService extends Resource {

    @ResourceAction({
        method: RequestMethod.Patch
      })
      query: ResourceMethod<ICourseQuery, QueryResults<ICourse>>;

      @ResourceAction({
        path: '/{!id}',
        method: RequestMethod.Get
      })
      getUser: ResourceMethod<{ id: any }, ICourse>;

      @ResourceAction({
        method: RequestMethod.Post
      })
      save: ResourceMethod<ICourse, ICourse>;
      @ResourceAction({
        method: RequestMethod.Put,
        path: '/{!id}'
      })
      update:  ResourceMethod<ICourse, ICourse>;


      @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
      })
      remove: ResourceMethod<{ id: any }, any>;


      @ResourceAction({
        path: '/saveCourseClass',
        method: RequestMethod.Post
      })
      saveCourseClass: ResourceMethod<ICourseClass, ICourseClass>;

      create(data: ICourse, callback?: (res: ICourse) => any) {
        return this.save(data, callback);
      }




      createClass(data: ICourseClass, callback?: (res: ICourseClass) => any) {
        return this.saveCourseClass(data, callback);

      }
 }
