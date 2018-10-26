import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ResourceProviders } from './ResourceProviders';

export * from './Resource';
export * from './ResourceAction';
export * from './ResourceCRUD';
export * from './ResourceCRUDBase';
export * from './ResourceGlobalConfig';
export * from './ResourceModel';
export * from './ResourceODATA';
export * from './ResourceParams';
export * from './ResourceProviders';
export * from './Interfaces';

@NgModule({
  imports: [CommonModule, HttpModule]
})
export class ResourceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ResourceModule,
      providers: ResourceProviders.providers[ResourceProviders.mainProvidersName]
    };
  }

  static forChild(subSet: string): ModuleWithProviders {
    return {
      ngModule: ResourceModule,
      providers: ResourceProviders.providers[subSet] ? ResourceProviders.providers[subSet] : []
    };
  }

}
