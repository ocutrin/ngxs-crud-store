import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreActionFactory } from '../store/store-action.factory';
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

  constructor(public store: Store) {
    super(UsersComponent.key, store);
  }

  randomUser(): void {
    this.store.dispatch(new StoreActionFactory(this.key)
      .create({
        id: -1,
        name: Math.random().toString(36).substring(2),
        password: Math.random().toString(36).substring(7),
        active: Math.random() >= 0.5
      }));
  }

}
