
import { Injectable, Inject } from '@angular/core';
import { UsersService, IUsersQuery, IUsers } from '../../shared/service/users/users.service';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { BASE_URL } from '../../shared/service/const';
import { DepartmentService, IDepartment, IDepartmentQuery } from '../../shared/service/users/department.service';
import { RoleService, IRoleQuery, IRole } from '../../shared/service/users/role.service';
import { StudentService, IStudentQuery, IStudent } from '../../shared/service/student/student.service';
import { TeacherService, ITeacherQuery, ITeacher } from '../../shared/service/teacher/teacher.service';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class UserService {
    options: any;
    headers: Headers;
    constructor(
        private usersService: UsersService,
        private roleService: RoleService,
        private departmentService: DepartmentService,
        private studentService: StudentService,
        private teacherService: TeacherService,
        private http: Http

    ) {
    }
    getUser(id: number) {
        return this.usersService.get({ id });
    }
    getUserByPhone(term: string): Observable<IUsers[]> {
        this.usersService.query();
        return null;
    }

    getUsersList(usersQuery?: IUsersQuery) {
        return this.usersService.query(usersQuery);
    }
    usersCreate(users: IUsers) {
        return this.usersService.create(users);
    }
    usersUpdate(users: IUsers) {
        return this.usersService.update(users);
    }
    usersDelete(id: number) {
        return this.usersService.remove({ id });
    }

    getRole(id: number) {
        return this.roleService.get({ id });
    }
    getRolesList(RoleQuery?: IRoleQuery) {
        return this.roleService.query(RoleQuery);
    }
    rolesCreate(Role: IRole) {
        return this.roleService.save(Role);
    }
    rolesUpdate(Roles: IRole) {
        return this.roleService.update(Roles);
    }
    rolesDelete(id: number) {
        return this.roleService.remove({ id });
    }

    getDepartment(id: number) {
        return this.usersService.get({ id });
    }
    getDepartmentList(departmentQuery?: IDepartmentQuery) {
        return this.departmentService.query(departmentQuery);
    }
    departmentCreate(department: IDepartment) {
        return this.departmentService.create(department);
    }
    departmentUpdate(department: IDepartment) {
        return this.departmentService.update(department);
    }
    departmentDelete(id: number) {
        return this.departmentService.remove({ id });
    }

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



    getTeacherList(usersQuery?: ITeacherQuery) {
        //  getTeacherList方法中调用构造函数中TeacherService下的query方法
        return this.teacherService.query(usersQuery);
    }

    // 获取教师级别下拉框
    getTeacherLevelList(teacherQuery?: ITeacherQuery) {
        return this.teacherService.query(teacherQuery);
    }

    // 编辑教师
    teacherUpdate(teacher?: ITeacher) {
        return this.teacherService.update(teacher);
    }

    // 通过id查询教师
    findTeacherById(teacherQuery?: ITeacherQuery) {
        return this.teacherService.findTeacherById(teacherQuery);
    }

    getTeacher(id: number) {
        return this.teacherService.get({ id });
    }

    teacherCreate(teacher: ITeacher) {
        return this.teacherService.create(teacher);
    }

    sendVerifyCode(id: number) {

        return this.usersService.sendCode(id);
    }

}
