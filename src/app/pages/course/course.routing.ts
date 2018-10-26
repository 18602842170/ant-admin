import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CourseComponent } from './course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseAddComponent } from './course-list/course-add/course-add.component';
import { CourseSignupComponent } from './course-list/course-signup/course-signup.component';
import { CourseArrangingComponent } from './course-list/course-arranging/course-arranging.component';
import { ArrangingDetailComponent } from './course-list/course-arranging/arranging-detail/arranging-detail.component';
import { CourseEvaluateComponent } from './course-list/course-evaluate/course-evaluate.component';
import { CourseSignupListComponent } from './course-list/course-signup-list/course-signup-list.component';
import { CoursereserveListComponent } from './coursereserve-list/coursereserve-list.component';
import { CoursesubjectListComponent } from './coursesubject-list/coursesubject-list.component';
import { CoursesubjectAddComponent } from './coursesubject-list/coursesubject-add/coursesubject-add.component';
import { CoursesubjectEditComponent } from './coursesubject-list/coursesubject-edit/coursesubject-edit.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { GradeAddComponent } from './grade-list/grade-add/grade-add.component';
import { GradeEditComponent } from './grade-list/grade-edit/grade-edit.component';
import { CurriculumComponent } from './curriculum/curriculum.component';


export const routes: Routes = [
  {
    path: '',
    component: CourseComponent,
    children: [
      {
        path: 'course-list',
        component: CourseListComponent
      },
      {
        path: 'course-add',
        component: CourseAddComponent
      },
      {
        path: 'course-signup',
        component: CourseSignupComponent
      },
      {
        path: 'course-signup-list',
        component: CourseSignupListComponent
      },
      {
        path: 'course-arranging',
        component: CourseArrangingComponent
      },
      {
        path: 'course-arrangings',
        component: CourseArrangingComponent
      },
      {
        path: 'course-arranging/arranging-detail',
        component: ArrangingDetailComponent
      },
      {
        path: 'course-evaluate',
        component: CourseEvaluateComponent
      },
      {
        path: 'coursereserve-list',
        component: CoursereserveListComponent
      },
      {
        path: 'coursesubject-list',
        component: CoursesubjectListComponent
      },
      {
        path: 'coursesubject-add',
        component: CoursesubjectAddComponent
      },
      {
        path: 'coursesubject-edit',
        component: CoursesubjectEditComponent
      },
      {
        path: 'grade-list',
        component: GradeListComponent
      },
      {
        path: 'grade-add',
        component: GradeAddComponent
      },
      {
        path: 'grade-edit',
        component: GradeEditComponent
      },
      {
        path: 'curriculum-list',
        component: CurriculumComponent
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
