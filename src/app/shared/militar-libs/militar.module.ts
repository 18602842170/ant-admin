import { NgModule } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { SubMenuComponent } from './components/menu/sub-menu/sub-menu.component';


@NgModule({
  declarations: [
    MenuComponent,
    SubMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule.forRoot()
  ],
  exports: [
    MenuComponent
  ]
})
export class MilitarModule {

}
