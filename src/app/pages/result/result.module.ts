import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';
import { routing } from './result.routing';
import { ResultComponent } from './result.component';

@NgModule({
  imports: [
    CommonModule,
    ViserModule,
    NgZorroAntdModule.forRoot(),
    routing,
  ],
  declarations: [
    ResultComponent,
    SuccessComponent,
    ErrorComponent,
  ],
  providers: [

  ]
})
export class ResultModule {
}
