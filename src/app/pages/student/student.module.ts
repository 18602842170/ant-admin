import 'zone.js';
import 'reflect-metadata';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { routing } from './student.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { TreeModule } from 'ng2-tree';
import { StudentPageService } from './studentPage.service';
import { StudentService } from '../../shared/service/student/student.service';
import { StudentAddComponent } from './student-list/student-add/student-add.component';
import { StudentEditComponent } from './student-list/student-edit/student-edit.component';
import { StudentCourseComponent } from './student-list/student-course/student-course.component';
import { CourseDetailService } from '../../shared/service/coursedetail/coursedetail.service';
import { DistinguishService } from '../../shared/service/distinguish/distinguish.service';
import { DepositstudentService } from '../../shared/service/student/depositstudent.service';
import { ClassroomService } from '../../shared/service/classroom/classroom.service';
import { CourseService } from '../course/course.service';
import { RollCallService } from '../../shared/service/rollCall/rollCall.service';
import { DepositstudentAddComponent } from './depositstudent-list/depositstudent-add/depositstudent-add.component';
import { DepositstudentEditComponent } from './depositstudent-list/depositstudent-edit/depositstudent-edit.component';
import { DepositstudentListComponent } from './depositstudent-list/depositstudent-list.component';
import { CoursereserveService } from '../../shared/service/course/coursereserve.service';
import { CoursetableService } from '../../shared/service/course/coursetable.service';
import { GradeService } from '../../shared/service/grade/grade.service';

@NgModule({
  imports: [
    CommonModule,
    ViserModule,
    NgZorroAntdModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    routing,
    TreeModule,
  ],
  // 写入teacher模块和其下所有子模块
  declarations: [
    StudentComponent,
    StudentListComponent,
    StudentAddComponent,
    StudentEditComponent,
    StudentCourseComponent,
    DepositstudentAddComponent,
    DepositstudentEditComponent,
    DepositstudentListComponent
  ],
  // providers中要加入teacher模块下的Service，用到了什么Service就都要写进来
  // NzModalService是共同Service
  // TeacherPageService是供teacher和其子模块画面使用的Service，虽然在TeacherPageService中有构造函数构造了TeacherService
  // 但是构造不等同于引入，所以在这里还要单独再把TeacherService写进来~
  providers: [
    NzModalService,
    StudentService,
    CourseDetailService,
    DistinguishService,
    StudentPageService,
    DepositstudentService,
    ClassroomService,
    CourseService,
    RollCallService,
    CoursereserveService,
    CoursetableService,
    GradeService
  ],

  // 下面这里是用来给弹窗popup页面用的，但是系统中目前没有采用弹出画面设计，所以暂且不用
  entryComponents: [

  ]
})

// 生命这个出口类名称为TeacherModel
export class StudentModule {
}
