import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TeacherComponent } from './teacher.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherAddComponent } from './teacher-list/teacher-add/teacher-add.component';
import { TeacherEditComponent } from './teacher-list/teacher-edit/teacher-edit.component';
import { TeacherViewComponent } from './teacher-list/teacher-view/teacher-view.component';
import { DepositteacherListComponent } from './depositteacher-list/depositteacher-list.component';
import { DepositteacherAddComponent } from './depositteacher-list/depositteacher-add/depositteacher-add.component';
import { DepositteacherEditComponent } from './depositteacher-list/depositteacher-edit/depositteacher-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: 'teacher-list',
        component: TeacherListComponent
      },
      {
        path: 'teacher-add',
        component: TeacherAddComponent
      },
      {
        path: 'teacher-edit',
        component: TeacherEditComponent
      },
      {
        path: 'teacher-view',
        component: TeacherViewComponent
      },
      {
        path: 'teacher-deposit',
        component: DepositteacherListComponent
      },
      {
        path: 'teacher-deposit-add',
        component: DepositteacherAddComponent
      },
      {
        path: 'teacher-deposit-edit',
        component: DepositteacherEditComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
