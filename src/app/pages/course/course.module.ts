import 'zone.js';
import 'reflect-metadata';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { routing } from './course.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseComponent } from './course.component';
import { TreeModule } from 'ng2-tree';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseService } from './course.service';
import { CourseAddComponent } from './course-list/course-add/course-add.component';
import { CourseEvaluateComponent } from './course-list/course-evaluate/course-evaluate.component';
import { RollCallService } from '../../shared/service/rollCall/rollCall.service';
import { StudentService } from '../../shared/service/student/student.service';
import { CourseSignupComponent } from './course-list/course-signup/course-signup.component';
import { CourseArrangingComponent } from './course-list/course-arranging/course-arranging.component';
import { ArrangingDetailComponent } from './course-list/course-arranging/arranging-detail/arranging-detail.component';
import { ClassroomService } from '../../shared/service/classroom/classroom.service';
import { CourseAllotsService } from './course-list/course-signup/courseallot.service';
import { CourseDetailService } from '../../shared/service/coursedetail/coursedetail.service';
import { CourseSignupListComponent } from './course-list/course-signup-list/course-signup-list.component';
import { CourseDetailsService } from './course-list/course-arranging/arranging-detail/coursedetails.service';
import { CoursereserveListComponent } from './coursereserve-list/coursereserve-list.component';
import { CoursereserveService } from '../../shared/service/course/coursereserve.service';
import { CoursesubjectListComponent } from './coursesubject-list/coursesubject-list.component';
import { CoursesubjectAddComponent } from './coursesubject-list/coursesubject-add/coursesubject-add.component';
import { CoursesubjectEditComponent } from './coursesubject-list/coursesubject-edit/coursesubject-edit.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { GradeAddComponent } from './grade-list/grade-add/grade-add.component';
import { GradeService } from '../../shared/service/grade/grade.service';
import { GradeEditComponent } from './grade-list/grade-edit/grade-edit.component';
import { CoursetableService } from '../../shared/service/course/coursetable.service';
import { CurriculumComponent } from './curriculum/curriculum.component';
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
  declarations: [
    CourseComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseSignupComponent,
    CourseArrangingComponent,
    ArrangingDetailComponent,
    CourseEvaluateComponent,
    CourseSignupListComponent,
    CoursereserveListComponent,
    CoursesubjectListComponent ,
    CoursesubjectAddComponent,
    CoursesubjectEditComponent,
    GradeListComponent,
    GradeAddComponent,
    GradeEditComponent,
    CurriculumComponent
  ],
  providers: [
    CourseAllotsService,
    CourseDetailsService,
    NzModalService,
    CourseService,
    RollCallService,
    StudentService,
    CoursereserveService,
    GradeService,
    CoursetableService
  ],


  entryComponents: [

  ]
})


export class CourseModule {
}
