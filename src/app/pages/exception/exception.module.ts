import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { ExceptionTriggerComponent } from './exception-trigger/exception-trigger.component';
import { routing } from './exception.routing';
import { ExceptionComponent } from './exception.component';
import { Exception403Component } from './exception-403/exception-403.component';
import { Exception404Component } from './exception-404/exception-404.component';
import { Exception500Component } from './exception-500/exception-500.component';
import { UsersService } from '../../shared/service/users/users.service';
import { ExceptionService } from './exception.service';

@NgModule({
  imports: [
    CommonModule,
    ViserModule,
    NgZorroAntdModule.forRoot(),
    routing,
  ],
  declarations: [
    ExceptionComponent,
    ExceptionTriggerComponent,
    Exception403Component,
    Exception404Component,
    Exception500Component
  ],
  providers: [
    UsersService,
    ExceptionService
  ]
})
export class ExceptionModule {
}
