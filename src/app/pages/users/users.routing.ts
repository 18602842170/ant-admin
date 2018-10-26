import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';
import { UsersAddComponent } from './users-list/users-add/users-add.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleAddComponent } from './role-list/role-add/role-add.component';
import { DepartmentListComponent } from './department-list/department-list.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'users-list',
        component: UsersListComponent
      },
      {
        path: 'users-add',
        component: UsersAddComponent
      },
      {
        path: 'role-list',
        component: RoleListComponent
      },
      {
        path: 'role-add',
        component: RoleAddComponent
      },
      {
        path: 'department-list',
        component: DepartmentListComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
