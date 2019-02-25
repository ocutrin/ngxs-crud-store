import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { StoreComponent } from '../store/store.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends StoreComponent {

  static key = 'users';

  title = 'Users';

  constructor(public store: Store, public formBuilder: FormBuilder) {
    super(UsersComponent.key, store, formBuilder);
  }

  initForm() {
    return this.formBuilder.group({
      name: ['', Validators.required], password: ['', Validators.required], active: [true, Validators.required]
    });
  }

}
