import 'zone.js';
import 'reflect-metadata';
import * as Raven from 'raven-js';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { PagesModule } from './pages/pages.module';
import { MilitarModule } from './shared/militar-libs/militar.module';
import { ViserModule } from 'viser-ng';
import './rxjs-extensions';

// Raven
//   .config('http://313e1b1d37e24cf3acbdfbf2560da843@sentry.kaimadata.com.cn/11')
//   .install();

// export class RavenErrorHandler implements ErrorHandler {
//   handleError(err: any): void {
//     Raven.captureException(err);
//   }
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViserModule,
    HttpModule,
    BrowserAnimationsModule,
    MilitarModule,
    NgZorroAntdModule.forRoot(),
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
  ],
  // providers: [{ provide: ErrorHandler, useClass: RavenErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
