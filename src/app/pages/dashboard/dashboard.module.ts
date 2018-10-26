import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { routing } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { MonitorComponent } from './monitor/monitor.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { ViserModule } from 'viser-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ViserModule,
    NgZorroAntdModule.forRoot(),
    routing,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    AnalysisComponent,
    MonitorComponent,
    WorkplaceComponent,
  ],
  providers: [
  ]
})
export class DashboardModule {
}
