import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    RouterModule.forChild([{ path: '', component: UsersComponent }]),
    NgxsModule.forFeature([UsersState]),
    // StorePluginModule.forRoot(UsersComponent.key),
  ],
  exports: [
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }

