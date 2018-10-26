import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { QueryListComponent } from './query-list/query-list.component';
import { ListComponent } from './list.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    children: [
      { path: '', redirectTo: 'analysis', pathMatch: 'full' },
      {
        path: 'query-list',
        component: QueryListComponent
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
