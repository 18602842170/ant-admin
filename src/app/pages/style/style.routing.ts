import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CommonStyleComponent } from './common-style/common-style.component';
import { StyleComponent } from './style.component';

export const routes: Routes = [
  {
    path: '',
    component: StyleComponent,
    children: [
      { path: '', redirectTo: 'analysis', pathMatch: 'full' },
      {
        path: 'common-style',
        component: CommonStyleComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
