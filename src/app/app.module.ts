import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { AppComponent } from './app.component';
import { StorePluginModule } from './store/store-plugin.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([], { developmentMode: environment.production }),
    StorePluginModule.forRoot(UsersComponent.key),
    AppRoutingRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

