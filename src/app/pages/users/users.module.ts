import 'zone.js';
import 'reflect-metadata';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { routing } from './users.routing';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddComponent } from './users-list/users-add/users-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleAddComponent } from './role-list/role-add/role-add.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { TreeModule } from 'ng2-tree';
import { UserService } from './user.service';

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
    UsersComponent,
    UsersAddComponent,
    UsersListComponent,
    RoleAddComponent,
    RoleListComponent,
    DepartmentListComponent,
  ],
  providers: [
    NzModalService,
    UserService,
  ],
  entryComponents: [
    UsersAddComponent
  ]
})
export class UsersModule {
}
