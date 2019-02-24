import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { NGXS_PLUGINS } from '@ngxs/store';
import { createStorePlugin } from './store.plugin';

@NgModule()
export class StorePluginModule {
  static forRoot(storeKey: string): ModuleWithProviders {
    return {
      ngModule: StorePluginModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useValue: createStorePlugin(storeKey),
          multi: true
        }
      ]
    };
  }
}
