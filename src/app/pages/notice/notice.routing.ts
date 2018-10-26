import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NoticeComponent } from './notice.component';
import { NoticeListComponent } from './notice-list/notice-list.component';
import { NoticeAddComponent } from './notice-add/notice-add.component';
import { NoticeEditComponent } from './notice-edit/notice-edit.component';
export const routes: Routes = [
  {
    path: '',
    component: NoticeComponent,
    children: [
      {
        path: 'notice-list',
        component: NoticeListComponent
      },
      {
        path: 'notice-add',
        component: NoticeAddComponent
      },
      {
        path: 'notice-edit',
        component: NoticeEditComponent
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
