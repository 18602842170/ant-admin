import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { AdvacedFormComponent } from './advanced-form/advanced-form.component';
import { StepFormComponent } from './step-form/step-form.component';
import { FormComponent } from './form.component';

export const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    children: [
      { path: '', redirectTo: 'analysis', pathMatch: 'full' },
      {
        path: 'basic-form',
        component: BasicFormComponent
      },
      {
        path: 'advanced-form',
        component: AdvacedFormComponent
      },
      {
        path: 'step-form',
        component: StepFormComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
