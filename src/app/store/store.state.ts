import { Type } from '@angular/core';
import { Action, Actions, Selector, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { ActionFactory, StoreActionFactory } from './store-action.factory';
import { StoreService } from './store.service';

export interface StateModel {
  ids: string[];
  entities: any[];
  error?: any;
}

export const initialState = {
  ids: [],
  entities: []
};

export interface StoreStateSelectors {
  ids: (state) => any;
  entities: (state) => any;
}

export const key = 'store';

export class StoreState {

  static selectors(storeKey: string): StoreStateSelectors {
    return {
      ids: (state) => StoreState.ids(state, storeKey),
      entities: (state) => StoreState.entities(state, storeKey)
    };
  }

  @Selector()
  private static ids(state: StateModel, storeKey: string): Type<any> {
    return state[storeKey].ids;
  }

  @Selector()
  private static entities(state: StateModel, storeKey: string): Type<any> {
    return state[storeKey].entities;
  }

  @Selector()
  private static error(state: StateModel, storeKey: string): Type<any> {
    return state[storeKey].error;
  }

  constructor(public servicio: StoreService, public actions$: Actions) { }

  @Action(new StoreActionFactory(key).search())
  search(context: StateContext<any>) {
    return this.servicio.search().pipe(
      tap((res: any[]) => context.setState({
        ids: res.map(r => r.id),
        entities: res,
      })));
  }

  @Action(new StoreActionFactory(key).create(null as any))
  create(context: StateContext<any>, accion: ActionFactory) {
    const state = context.getState();
    return this.servicio.create(accion.payload).pipe(
      tap((res: any) => {
        context.patchState({
          ids: [...state.ids, res.id],
          entities: [...state.entities, res],
        });
      }), catchError(res => {
        return res;
      }));
  }

  // @Action(new StoreActionCrudFactory(crudStateName).update(null as any))
  // update(context: StateContext<any>, accion: ActionCrud) {
  //   const state = context.getState();
  //   return this.servicio.update(accion.payload).pipe(
  //     tap(() => {
  //       context.patchState({
  //         ...state
  //       });
  //     }), catchError(res => {

  //       return res;
  //     }));
  // }

  @Action(new StoreActionFactory(key).delete(null as any))
  delete(context: StateContext<any>, accion: ActionFactory) {
    const state = context.getState();
    return this.servicio.delete(accion.payload).pipe(
      tap(() => {
        context.patchState({
          ids: state.ids.filter(i => i.id !== accion.payload.id),
          entities: state.entities.filter(i => i.id !== accion.payload.entities),
        });
      }), catchError(res => {

        return res;
      }));
  }

  @Action(new StoreActionFactory(key).clearStore())
  clearStore(context: StateContext<any>) {
    return context.setState(initialState);
  }

}
