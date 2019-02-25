import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { StoreComponent } from '../../core/store/store.component';
import { User } from './model/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends StoreComponent<User> {

  static key = 'users';

  title = 'Users';

  isAdd = false;

  constructor(public store: Store, public formBuilder: FormBuilder) {
    super(UsersComponent.key, store, formBuilder);
  }

  initForm() {
    return this.formBuilder.group({
      name: ['', Validators.required], password: ['', Validators.required], active: [true, Validators.required]
    });
  }


  save() {
    super.add();
  }

  add() {
    this.isAdd = true;
  }

  edit() {
    this.isAdd = true;
    super.edit();
  }


  cancel() {
    this.store.dispatch(new UpdateFormValue({ value: { name: '', password: '', active: true }, path: 'users.form' }));
    this.isAdd = false;
  }

}
