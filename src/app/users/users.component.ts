import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  randomUser(): void {
    this.store.dispatch(this.actions.create({
      id: -1,
      name: Math.random().toString(36).substring(2),
      password: Math.random().toString(36).substring(7),
      active: Math.random() >= 0.5
    }));
  }

  add() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  delete() {

  }

  selectRow(entity: any) {
    // const selectEntity = this.selectEntity && this.selectEntity.id === entity.id ? undefined : entity;


    this.store.dispatch(this.actions.selectedEntity(entity));


    // this.store.dispatch(new UpdateFormValue(
    // { value: this.selectEntity ? this.selectEntity : { name: '', password: '', active: true }, path: 'users.form' }));
  }

  isSelectRow(e: any) {
    const select: any[] = this.store.selectSnapshot(state => state.users.selectedEntities);
    // // const unselect = !(this.selectEntity && this.form.value.name === this.selectEntity.name);

    const s = select.filter(r => r.id !== e.id);

    // console.log(s);

    // // if (!(select && !unselect)) {
    // // this.selectEntity = undefined;
    // // this.store.dispatch(this.actions.selectedEntity(this.selectEntity));
    // // }

    return {
      'background-color': s[0] && s[0].id === e.id ? '#f3d008' : '',
      'color': s[0] && s[0].id === e.id ? '#fff' : ''
    };

    // return {
    //   'background-color': '',
    //   'color': ''
    // };
  }


}
