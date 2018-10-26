
// 这个service是student模块的service
// 可以理解为社内系统中每次生成entity后附带生成的Service，只不过针对的不是一个单表，是一个模块
import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from '../const';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from '../ngx-resource';
import { QueryResults, IQuery } from '../interface';
import { auth } from '../auth-decorator';

// 这个是查询接口，定义前台页面准备传入后台的查询条件，这里写了什么查询条件，提交时就会传给后台对应的查询条件
// 其中的名称对应后台Form或者Dto里的字段名称
// 如下，这里准备了两个查询条件，对应后台的teacherCd和teacherName
export interface IClassroomQuery extends IQuery {
  id?: number;
  classroomName?: string;
  classroomPeople?: number;
  classroomAddress?: string;
}

// 这里的接口可以理解为画面展示用接口，即想要在画面上显示出来的字段
// 比如后台传回一个List<Teacher>，每一个Teacher对象中拥有6个变量，下面的interface中我写入了三个变量：Cd，Name，和Sex，那么即使6个变量都有值并且全部传回
// 那么也只会向画面传回我在interface中定义的三个变量的值
export interface IClassroom {
  id?: number;
  classroomName?: string;
  classroomPeople?: number;
  classroomAddress?: string;
}


// 这是定义后台调用的controllor的地址
@Injectable()
@ResourceParams({
  url: `${BASE_URL}/classroom`
})

// 声明这个class叫TeacherService，名称自取
export class ClassroomService extends Resource {

  // 这是定义在后台controllor中调用的方法，这里调用的是patch方法，会指定到后台controllor中注解为patch的方法
  @ResourceAction({
    path: '/{!id}',
    method: RequestMethod.Get
  })
  get: ResourceMethod<{ id: any }, IClassroom>;

  @ResourceAction({
    method: RequestMethod.Patch
  })
  query: ResourceMethod<IClassroomQuery, QueryResults<IClassroom>>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  create: ResourceMethod<IClassroom, IClassroom>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!id}'
  })
  update: ResourceMethod<IClassroom, IClassroom>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  remove: ResourceMethod<{ id: any }, any>;
}
