import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { CommonStyleComponent } from './common-style/common-style.component';
import { routing } from './style.routing';
import { StyleComponent } from './style.component';

@NgModule({
  imports: [
    CommonModule,
    ViserModule,
    NgZorroAntdModule.forRoot(),
    routing
  ],
  declarations: [
    StyleComponent,
    CommonStyleComponent,
  ],
  providers: [

  ]
})
export class StyleModule {
}
