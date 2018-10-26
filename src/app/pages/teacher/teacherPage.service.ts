
// 这个Service是写在page下的teacher模块下的，可以理解为社内系统中自己写的service，例如rp0101Service
// 这个Service是提供给teacher模块下所有子模块用的
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BASE_URL } from '../../shared/service/const';
import { TeacherService, ITeacherQuery, ITeacher } from '../../shared/service/teacher/teacher.service';
import { ICourseDetailQuery, CourseDetailService } from '../../shared/service/coursedetail/coursedetail.service';
import { DepositteacherService, IDepositTeacherQuery, IDepositteacher } from '../../shared/service/teacher/depositteacher.service';

@Injectable()
export class TeacherPageService {
    options: any;
    headers: Headers;
    constructor(
        // 这里构造函数，可以理解为引入了TeacherService，TeacherService在shared中
        private teacherService: TeacherService,
        private depositteacherService: DepositteacherService,
        private courseDetailService: CourseDetailService

    ) {
    }
    // getUser(id: number) {
    //     return this.teacherService.get({ id });
    // }

    // 一个名叫getTeacherList的查询方法，传入的是ITeacherQuery类型的查询条件，这个查询条件在shared下的TeacherService中有详细说明
    getTeacherList(usersQuery?: ITeacherQuery) {
        //  getTeacherList方法中调用构造函数中TeacherService下的query方法
        return this.teacherService.query(usersQuery);
    }

    // 获取教师级别下拉框
    getTeacherLevelList(teacherQuery?: ITeacherQuery) {
        return this.teacherService.query(teacherQuery);
    }

    // 编辑教师
    teacherUpdate(teacher?: ITeacher){
        return this.teacherService.update(teacher);
    }

    // 通过id查询教师
    findTeacherById(teacherQuery?: ITeacherQuery){
        return this.teacherService.findTeacherById(teacherQuery);
    }

    getTeacher(id: number) {
        return this.teacherService.get({ id });
    }

    // 通过id和时间查询课程信息
    getCourseDetailList(courseQuery?: ICourseDetailQuery) {
        return this.courseDetailService.query(courseQuery);
    }


    // 以下为托管用
    getDepositTeacherList(usersQuery?: IDepositTeacherQuery) {
        return this.depositteacherService.query(usersQuery);
    }

    createDepositTeacher(usersQuery?: IDepositteacher) {
        return this.depositteacherService.create(usersQuery);
    }

    updateDepositTeacher(usersQuery?: IDepositteacher) {
        return this.depositteacherService.update(usersQuery);
    }

    getTeacherDeposit(id: number) {
        return this.depositteacherService.get({ id });
    }

    deleteTeacherDeposit(id: number){
        return this.depositteacherService.delete({ id });
    }




}
