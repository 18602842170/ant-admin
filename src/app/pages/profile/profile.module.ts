import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { BasicDetailComponent } from './basic-detail/basic-detail.component';
import { AdvacedDetailComponent } from './advanced-details/advanced-details.component';
import { routing } from './profile.routing';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    ViserModule,
    NgZorroAntdModule.forRoot(),
    routing,
  ],
  declarations: [
    ProfileComponent,
    BasicDetailComponent,
    AdvacedDetailComponent,
  ],
  providers: [

  ]
})
export class ProfileModule {
}
