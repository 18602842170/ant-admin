import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { QueryListComponent } from './query-list/query-list.component';
import { routing } from './list.routing';
import { ListComponent } from './list.component';

@NgModule({
  imports: [
    CommonModule,
    ViserModule,
    NgZorroAntdModule.forRoot(),
    routing,
  ],
  declarations: [
    ListComponent,
    QueryListComponent
  ],
  providers: [

  ]
})
export class ListModule {
}
