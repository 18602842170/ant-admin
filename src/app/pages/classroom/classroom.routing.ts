import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ClassroomComponent } from './classroom.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomAddComponent } from './classroom-list/classroom-add/classroom-add.component';
import { ClassroomEditComponent } from './classroom-list/classroom-edit/classroom-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: ClassroomComponent,
    children: [
      {
        path: 'classroom-list',
        component: ClassroomListComponent
      },
      {
        path: 'classroom-add',
        component: ClassroomAddComponent
      },
      {
        path: 'classroom-edit',
        component: ClassroomEditComponent
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
