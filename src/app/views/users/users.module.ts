import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { UsersState } from './users.state';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: UsersComponent }]),
    NgxsModule.forFeature([UsersState]),
    NgxsFormPluginModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }

