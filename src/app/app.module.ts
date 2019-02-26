import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment.prod';
import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { AppComponent } from './app.component';
import { StoreCrudPluginModule } from './core/store-crud/store-crud-plugin.module';
import { HomeComponent } from './views/home/home.component';
import { UsersComponent } from './views/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([], { developmentMode: environment.production }),
    StoreCrudPluginModule.forRoot(UsersComponent.key),
    AppRoutingRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

