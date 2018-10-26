import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { AdvacedFormComponent } from './advanced-form/advanced-form.component';
import { StepFormComponent } from './step-form/step-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViserModule } from 'viser-ng';
import { routing } from './form.routing';
import { FormComponent } from './form.component';

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
    FormComponent,
    BasicFormComponent,
    AdvacedFormComponent,
    StepFormComponent,
  ],
  providers: [

  ]
})
export class FormModule {
}
