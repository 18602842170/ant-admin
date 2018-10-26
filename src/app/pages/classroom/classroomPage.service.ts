
// 这个Service是写在page下的teacher模块下的，可以理解为社内系统中自己写的service，例如rp0101Service
// 这个Service是提供给teacher模块下所有子模块用的
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BASE_URL } from '../../shared/service/const';
import { ClassroomService, IClassroom, IClassroomQuery } from '../../shared/service/classroom/classroom.service';

@Injectable()
export class ClassroomPageService {
    options: any;
    headers: Headers;
    constructor(
        // 这里构造函数，可以理解为引入了TeacherService，TeacherService在shared中
        private classroomService: ClassroomService

    ) {
    }
    // getUser(id: number) {
    //     return this.teacherService.get({ id });
    // }

    // 一个名叫getTeacherList的查询方法，传入的是ITeacherQuery类型的查询条件，这个查询条件在shared下的TeacherService中有详细说明

    getClassroom(id: number) {
        return this.classroomService.get({ id });
    }

    getClassroomList(classroomQuery?: IClassroomQuery) {
        //  getTeacherList方法中调用构造函数中TeacherService下的query方法
        return this.classroomService.query(classroomQuery);
    }

    classroomCreate(classroom: IClassroom) {
        return this.classroomService.create(classroom);
    }

    classroomUpdate(classroom: IClassroom) {
        return this.classroomService.update(classroom);
    }

    classroomDelete(id: number) {
         return this.classroomService.remove({ id });
    }

}
