import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreComponent } from '../store/store.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends StoreComponent {

  static key = 'users';

  title = 'Users';

  ids$: Observable<any[]>;

  entities$: Observable<any[]>;

  selectEntities$: Observable<any[]>;

  form: FormGroup;

  constructor(public formBuilder: FormBuilder, public store: Store) {
    super(UsersComponent.key, store);
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      active: [true, [Validators.required]]
    });
  }

  add() {
    if (this.form.valid) {
      this.store.dispatch(this.actions.create(this.form.value));
    }
  }

  edit() {
    this.store.dispatch(new UpdateFormValue({
      value: this.store.selectSnapshot(state => state.users.selectedEntities)[0], path: 'users.form'
    }));
  }

  delete() {
    this.store.dispatch(this.actions.delete(
      this.store.selectSnapshot(state => state.users.selectedEntities).map((e: any) => e.id)));
  }

  selectRow(entity: any) {
    this.store.dispatch(this.actions.selectedEntity(entity));

  }

  isSelectRow(entity: any) {
    return this.store.selectSnapshot(state => state.users.selectedEntities)
      .filter((r: any) => r.id === entity.id).length > 0 ? 'selected' : '';
  }


}
