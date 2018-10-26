import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BasicDetailComponent } from './basic-detail/basic-detail.component';
import { AdvacedDetailComponent } from './advanced-details/advanced-details.component';
import { ProfileComponent } from './profile.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'analysis', pathMatch: 'full' },
      {
        path: 'basic-detail',
        component: BasicDetailComponent
      },
      {
        path: 'advanced-detail',
        component: AdvacedDetailComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
