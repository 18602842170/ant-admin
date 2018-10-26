import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MilitarModule } from '../shared/militar-libs/militar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginService } from '../shared/service/login.service';
import { UsersService } from '../shared/service/users/users.service';



import { AuthGuard } from '../shared/service/auth-guard.service';
import { AuthService } from '../shared/service/auth.service';
import { ManagerCanActivate } from '../shared/service/manager-can-activate.service';
import { RoleService } from '../shared/service/users/role.service';
import { GetUserBySessionIdService } from '../shared/service/users/getUserBySession.service';
import { DepartmentService } from '../shared/service/users/department.service';
import { CourseComponent } from './course/course.component';
import { StudentPageService } from './student/studentPage.service';
import { StudentService } from '../shared/service/student/student.service';
import { TeacherService } from '../shared/service/teacher/teacher.service';
import { CourseService } from './course/course.service';
import { CoursesService } from '../shared/service/course/courses.service';
import { UserService } from './users/user.service';
import { ClassroomService } from '../shared/service/classroom/classroom.service';
import { CourseAllotService } from '../shared/service/courseAllot/courseAllot.service';
import { DistinguishService } from '../shared/service/distinguish/distinguish.service';
import { CourseDetailService } from '../shared/service/coursedetail/coursedetail.service';
import { GradeService } from '../shared/service/grade/grade.service';




@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule.forRoot(),
    MilitarModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PagesComponent,
    LoginComponent,
  ],
  providers: [
    CourseDetailService,
    DistinguishService,
    ClassroomService,
    UserService,
    LoginService,
    UsersService,
    RoleService,
    DepartmentService,
    CoursesService,
    StudentService,
    TeacherService,
    AuthGuard,
    AuthService,
    ManagerCanActivate,
    GetUserBySessionIdService,
    CourseAllotService,
    GradeService,
  ]
})
export class PagesModule {
}
