// 这个service是teacher模块的service
// 可以理解为社内系统中每次生成entity后附带生成的Service，只不过针对的不是一个单表，是一个模块
import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from '../const';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from '../ngx-resource';
import { QueryResults, IQuery } from '../interface';
import { auth } from '../auth-decorator';
import { updateLocale } from 'moment';

export interface IDepositStudentQuery extends IQuery {
  studentNameInUser?: string;
  classRoomName?: string;
  foodFlag?: string;
}

// 这里的接口可以理解为画面展示用接口，即想要在画面上显示出来的字段
// 重新说明，此处理解为画面Form
export interface IDepositstudent {
  id?:number;
  studentNameInUser?: string;
  classRoomName?: string;
  depositTimeStr?: string;
  studentUserId?: number;
  classRoomId?: number;
  depositStartDate?: Date;
  depositEndDate?: Date;
  needFoodStr?: string;
  foodFlag?: string;
}

// 这是定义后台调用的controllor的地址
@Injectable()
@ResourceParams({
  url: `${BASE_URL}/depositStudent`
})

// 声明这个class叫TeacherService，名称自取
export class DepositstudentService extends Resource {

  // 这是定义在后台controllor中调用的方法，这里调用的是patch方法，会指定到后台controllor中注解为patch的方法
  @ResourceAction({
    method: RequestMethod.Patch
  })
  query: ResourceMethod<IDepositStudentQuery, QueryResults<IDepositstudent>>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!id}'
  })
  update:  ResourceMethod<IDepositstudent, IDepositstudent>;

  @ResourceAction({
    path: '/{!id}',
    method: RequestMethod.Get
  })
  get: ResourceMethod<{ id: any }, IDepositstudent>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  create: ResourceMethod<IDepositstudent, IDepositstudent>;

  @ResourceAction({
    path: '/{!id}',
    method: RequestMethod.Delete
  })
  delete: ResourceMethod<{ id: any }, IDepositstudent>;


}
