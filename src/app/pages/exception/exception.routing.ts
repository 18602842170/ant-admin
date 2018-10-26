import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ExceptionTriggerComponent } from './exception-trigger/exception-trigger.component';
import { ExceptionComponent } from './exception.component';
import { Exception403Component } from './exception-403/exception-403.component';
import { Exception404Component } from './exception-404/exception-404.component';
import { Exception500Component } from './exception-500/exception-500.component';

export const routes: Routes = [
  {
    path: '',
    component: ExceptionComponent,
    children: [
      { path: '', redirectTo: 'analysis', pathMatch: 'full' },
      {
        path: 'exception-trigger',
        component: ExceptionTriggerComponent
      },
      {
        path: '403',
        component: Exception403Component
      },
      {
        path: '404',
        component: Exception404Component
      },
      {
        path: '500',
        component: Exception500Component
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
