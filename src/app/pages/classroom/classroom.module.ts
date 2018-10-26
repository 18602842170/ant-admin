import 'zone.js';
import 'reflect-metadata';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'ng2-tree';
import { StudentService } from '../../shared/service/student/student.service';
import { CourseDetailService } from '../../shared/service/coursedetail/coursedetail.service';
import { DistinguishService } from '../../shared/service/distinguish/distinguish.service';
import { ClassroomComponent } from './classroom.component';
import { ClassroomPageService } from './classroomPage.service';
import { ClassroomService } from '../../shared/service/classroom/classroom.service';
import { routing } from './classroom.routing';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomAddComponent } from './classroom-list/classroom-add/classroom-add.component';
import { ClassroomEditComponent } from './classroom-list/classroom-edit/classroom-edit.component';

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
    ClassroomComponent,
    ClassroomListComponent,
    ClassroomAddComponent,
    ClassroomEditComponent,
  ],
  // providers中要加入teacher模块下的Service，用到了什么Service就都要写进来
  // NzModalService是共同Service
  // TeacherPageService是供teacher和其子模块画面使用的Service，虽然在TeacherPageService中有构造函数构造了TeacherService
  // 但是构造不等同于引入，所以在这里还要单独再把TeacherService写进来~
  providers: [
    NzModalService,
    ClassroomService,
    ClassroomPageService
  ],

  // 下面这里是用来给弹窗popup页面用的，但是系统中目前没有采用弹出画面设计，所以暂且不用
  entryComponents: [

  ]
})

// 生命这个出口类名称为TeacherModel
export class ClassroomModule {
}
