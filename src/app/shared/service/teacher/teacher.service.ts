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

// 这个是查询接口，定义前台页面准备传入后台的查询条件，这里写了什么查询条件，提交时就会传给后台对应的查询条件
// 其中的名称对应后台Form或者Dto里的字段名称
// 如下，这里准备了两个查询条件，对应后台的teacherCd和teacherName
export interface ITeacherQuery extends IQuery {
  teacherId?: string;
  teacherCd?: string;
  teacherName?: string;
  teacherSex?: string;
  teacherLevel?: string;
  queryflg?: string;
  teacherProfile?: string;
}


// 这里的接口可以理解为画面展示用接口，即想要在画面上显示出来的字段
// 重新说明，此处理解为画面Form
export interface ITeacher {
  id?: number;
  teacherCd?: string;
  teacherName?: string;
  teacherSex?: string;
  teacherLevel?: string;
  teacherSexStr?: string;
  teacherLevelStr?: string;
  userId?: number;
  teacherProfile?: string;
}

// 这是定义后台调用的controllor的地址
@Injectable()
@ResourceParams({
  url: `${BASE_URL}/teacher`
})

// 声明这个class叫TeacherService，名称自取
export class TeacherService extends Resource {

  // 这是定义在后台controllor中调用的方法，这里调用的是patch方法，会指定到后台controllor中注解为patch的方法
  @ResourceAction({
    method: RequestMethod.Patch
  })
  query: ResourceMethod<ITeacherQuery, QueryResults<ITeacher>>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!id}'
  })
  update:  ResourceMethod<ITeacher, ITeacher>;

  // 通过id获取教师
  @ResourceAction({
    path: '/findTeacherById',
    method: RequestMethod.Get
  })
  findTeacherById:  ResourceMethod<ITeacherQuery, ITeacher>;

  // 通过id获取教师
  @ResourceAction({
    path: '/{!id}',
    method: RequestMethod.Get
  })
  get: ResourceMethod<{ id: any }, ITeacher>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  create: ResourceMethod<ITeacher, ITeacher>;


}
