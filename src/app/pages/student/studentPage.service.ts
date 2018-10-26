
// 这个Service是写在page下的teacher模块下的，可以理解为社内系统中自己写的service，例如rp0101Service
// 这个Service是提供给teacher模块下所有子模块用的
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BASE_URL } from '../../shared/service/const';
import { IStudentQuery, StudentService, IStudent } from '../../shared/service/student/student.service';
import { CourseDetailService, ICourseDetailQuery } from '../../shared/service/coursedetail/coursedetail.service';
import { DistinguishService, IDistinguish, IDistinguishQuery } from '../../shared/service/distinguish/distinguish.service';
import { IDepositTeacherQuery, IDepositteacher } from '../../shared/service/teacher/depositteacher.service';
import { DepositstudentService, IDepositStudentQuery, IDepositstudent } from '../../shared/service/student/depositstudent.service';

@Injectable()
export class StudentPageService {
    options: any;
    headers: Headers;
    constructor(
        // 这里构造函数，可以理解为引入了TeacherService，TeacherService在shared中
        private studentService: StudentService,
        private courseDetailService: CourseDetailService,
        private distinguishService: DistinguishService,
        private depositstudentService: DepositstudentService

    ) {
    }
    // getUser(id: number) {
    //     return this.teacherService.get({ id });
    // }

    // 一个名叫getTeacherList的查询方法，传入的是ITeacherQuery类型的查询条件，这个查询条件在shared下的TeacherService中有详细说明

    getStudent(id: number) {
        return this.studentService.get({ id });
    }

    getStudentList(studentQuery?: IStudentQuery) {
        //  getTeacherList方法中调用构造函数中TeacherService下的query方法
        return this.studentService.query(studentQuery);
    }

    studentCreate(student: IStudent) {
        return this.studentService.create(student);
    }

    studentUpdate(student: IStudent) {
        return this.studentService.update(student);
    }

    studentDelete(id: number) {
         return this.studentService.remove({ id });
    }

    // 通过id和时间查询课程信息
    getCourseDetailList(courseQuery?: ICourseDetailQuery) {
        return this.courseDetailService.query(courseQuery);
    }

    // 获取区分值
    getDistinguish(id: number) {
        return this.distinguishService.get({ id });
    }

    getDistinguishList(distinguishQuery?: IDistinguishQuery) {
        //  getTeacherList方法中调用构造函数中TeacherService下的query方法
        return this.distinguishService.query(distinguishQuery);
    }

    distinguishCreate(distinguish: IDistinguish) {
        return this.distinguishService.create(distinguish);
    }

    distinguishUpdate(distinguish: IDistinguish) {
        return this.distinguishService.update(distinguish);
    }

    distinguishDelete(id: number) {
         return this.distinguishService.remove({ id });
    }

    // 以下为托管用
    getDepositStudentList(usersQuery?: IDepositStudentQuery) {
        return this.depositstudentService.query(usersQuery);
    }

    createDepositStudent(usersQuery?: IDepositstudent) {
        return this.depositstudentService.create(usersQuery);
    }

    updateDepositStudent(usersQuery?: IDepositstudent) {
        return this.depositstudentService.update(usersQuery);
    }

    getStudentDeposit(id: number) {
        return this.depositstudentService.get({ id });
    }

    deleteStudentDeposit(id: number){
        return this.depositstudentService.delete({ id });
    }
}
