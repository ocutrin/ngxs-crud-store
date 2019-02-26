import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { NGXS_PLUGINS } from '@ngxs/store';
import { createStoreCrudPlugin } from './store-crud.plugin';

@NgModule()
export class StoreCrudPluginModule {
  static forRoot(storeKey: string): ModuleWithProviders {
    return {
      ngModule: StoreCrudPluginModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useValue: createStoreCrudPlugin(storeKey),
          multi: true
        }
      ]
    };
  }
}
