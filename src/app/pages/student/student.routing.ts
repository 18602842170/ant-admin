import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentAddComponent } from './student-list/student-add/student-add.component';
import { StudentEditComponent } from './student-list/student-edit/student-edit.component';
import { StudentCourseComponent } from './student-list/student-course/student-course.component';
import { DepositstudentListComponent } from './depositstudent-list/depositstudent-list.component';
import { DepositstudentAddComponent } from './depositstudent-list/depositstudent-add/depositstudent-add.component';
import { DepositstudentEditComponent } from './depositstudent-list/depositstudent-edit/depositstudent-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'student-list',
        component: StudentListComponent
      },
      {
        path: 'student-add',
        component: StudentAddComponent
      },
      {
        path: 'student-edit',
        component: StudentEditComponent
      },
      {
        path: 'student-course',
        component: StudentCourseComponent
      },
      {
        path: 'student-deposit',
        component: DepositstudentListComponent
      },
      {
        path: 'student-deposit-add',
        component: DepositstudentAddComponent
      },
      {
        path: 'student-deposit-edit',
        component: DepositstudentEditComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
