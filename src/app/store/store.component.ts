import { OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreActionFactory } from './store-action.factory';
import { StoreState, StoreStateSelectors } from './store.state';

export class StoreComponent implements OnInit {

  ids$: Observable<any[]>;

  entities$: Observable<any[]>;

  actions: StoreActionFactory;

  selectors: StoreStateSelectors;

  constructor(public key, public store: Store) {
    this.actions = new StoreActionFactory(this.key);
    this.selectors = StoreState.selectors(this.key);
    this.ids$ = this.store.select(this.selectors.ids);
    this.entities$ = this.store.select(this.selectors.entities);
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.store.dispatch(this.actions.search());
  }

  clear() {
    this.store.dispatch(this.actions.clearStore());
  }

}
