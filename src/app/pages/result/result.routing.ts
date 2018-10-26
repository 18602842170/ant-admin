import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';
import { ResultComponent } from './result.component';

export const routes: Routes = [
  {
    path: '',
    component: ResultComponent,
    children: [
      { path: '', redirectTo: 'analysis', pathMatch: 'full' },
      {
        path: 'success',
        component: SuccessComponent
      },
      {
        path: 'error',
        component: ErrorComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
