import 'zone.js';
import 'reflect-metadata';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { routing } from './teacher.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherComponent } from './teacher.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TreeModule } from 'ng2-tree';
import { TeacherPageService } from './teacherPage.service';
import { TeacherService } from '../../shared/service/teacher/teacher.service';
import { TeacherAddComponent } from './teacher-list/teacher-add/teacher-add.component';
import { TeacherEditComponent } from './teacher-list/teacher-edit/teacher-edit.component';
import { TeacherViewComponent } from './teacher-list/teacher-view/teacher-view.component';
import { CourseDetailService } from '../../shared/service/coursedetail/coursedetail.service';
import { DepositteacherListComponent } from './depositteacher-list/depositteacher-list.component';
import { DepositteacherService } from '../../shared/service/teacher/depositteacher.service';
import { DepositteacherEditComponent } from './depositteacher-list/depositteacher-edit/depositteacher-edit.component';
import { DepositteacherAddComponent } from './depositteacher-list/depositteacher-add/depositteacher-add.component';
import { ClassroomService } from '../../shared/service/classroom/classroom.service';
import { CourseService } from '../course/course.service';
import { RollCallService } from '../../shared/service/rollCall/rollCall.service';
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
    TeacherComponent,
    TeacherListComponent,
    TeacherAddComponent,
    TeacherEditComponent,
    TeacherViewComponent,
    DepositteacherAddComponent,
    DepositteacherEditComponent,
    DepositteacherListComponent
  ],
  // providers中要加入teacher模块下的Service，用到了什么Service就都要写进来
  // NzModalService是共同Service
  // TeacherPageService是供teacher和其子模块画面使用的Service，虽然在TeacherPageService中有构造函数构造了TeacherService
  // 但是构造不等同于引入，所以在这里还要单独再把TeacherService写进来~
  providers: [
    NzModalService,
    TeacherService,
    TeacherPageService,
    CourseDetailService,
    DepositteacherService,
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
export class TeacherModule {
}
