import { Action, Actions, Selector, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { ActionFactory, StoreActionFactory } from './store-action.factory';
import { StoreEntity } from './store-entity';
import { StoreService } from './store.service';

export interface StateModel {
  ids: string[];
  entities: StoreEntity[];
  selectedEntities: StoreEntity[];
  isSelectEntity: boolean;
  form: {
    model: StoreEntity,
    dirty: boolean,
    status: string,
    errors: any
  };
  error?: any;
}

export const initialState = {
  ids: [],
  entities: [],
  selectedEntities: [],
  isSelectEntity: false,
  form: {
    model: undefined,
    dirty: false,
    status: '',
    errors: {}
  }
};

export interface StoreStateSelectors {
  ids: (state: StateModel) => any[];
  entities: (state: StateModel) => any[];
  selectEntities: (state: StateModel) => any[];
  selectSelectedEntities: (state: StateModel) => any[];
  isSelectEntity: (state: StateModel) => boolean;
  error: (state: StateModel) => any;
}

export const key = 'store';

export class StoreState {

  @Selector()
  protected static ids(state: StateModel, storeKey: string): any[] {
    return state[storeKey].ids;
  }

  @Selector()
  protected static entities(state: StateModel, storeKey: string): any[] {
    return state[storeKey].entities;
  }

  @Selector()
  protected static selectEntities(state: StateModel, storeKey: string): any[] {
    return state[storeKey].selectEntities;
  }

  @Selector()
  protected static selectSelectedEntities(state: StateModel, storeKey: string): any[] {
    return state[storeKey].selectedEntities;
  }

  @Selector()
  protected static isSelectEntity(state: StateModel, storeKey: string): boolean {
    return state[storeKey].isSelectEntity;
  }

  @Selector()
  protected static error(state: StateModel, storeKey: string): any {
    return state[storeKey].error;
  }

  static selectors(storeKey: string): StoreStateSelectors {
    return {
      ids: (state: StateModel) => StoreState.ids(state, storeKey),
      entities: (state: StateModel) => StoreState.entities(state, storeKey),
      selectEntities: (state: StateModel) => StoreState.selectEntities(state, storeKey),
      selectSelectedEntities: (state: StateModel) => StoreState.selectSelectedEntities(state, storeKey),
      isSelectEntity: (state: StateModel) => StoreState.isSelectEntity(state, storeKey),
      error: (state: StateModel) => StoreState.error(state, storeKey)
    };
  }

  constructor(public storeService: StoreService<StoreEntity>, public actions$: Actions) { }

  @Action(new StoreActionFactory(key).search())
  search(context: StateContext<StateModel>) {
    const state = context.getState();
    return this.storeService.search().pipe(
      tap((res: StoreEntity[]) => context.setState({
        ...state,
        ids: res.map(r => r.id),
        entities: res,
      })), catchError(res => {
        return res;
      }));
  }

  @Action(new StoreActionFactory(key).create(null as StoreEntity))
  create(context: StateContext<StateModel>, action: ActionFactory) {
    const state = context.getState();
    return this.storeService.create(action.payload).pipe(
      tap((res: StoreEntity) => {
        context.patchState({
          ids: [...state.ids, res.id],
          entities: [...state.entities, res],
        });
      }), catchError(res => {
        return res;
      }));
  }

  @Action(new StoreActionFactory(key).selectedEntity(null as StoreEntity))
  selectedEntity(context: StateContext<StateModel>, action: ActionFactory) {
    const state = context.getState();
    const unselectEntities = state.selectedEntities.filter(r => r.id === action.payload.id);
    const unselect = unselectEntities.length === 0;
    return context.patchState({
      ...state,
      selectedEntities: action.payload && unselect ? [action.payload] : [],
      isSelectEntity: action.payload && unselect ? true : false
    });
  }

  @Action(new StoreActionFactory(key).update(null as StoreEntity))
  update(context: StateContext<StateModel>, action: ActionFactory) {
    const state = context.getState();
    return this.storeService.update(action.payload).pipe(
      tap((res: StoreEntity) => {
        context.patchState({
          ids: [...state.ids, res.id],
          entities: [...state.entities.filter(r => r.id !== res.id), res],
        });
      }), catchError(res => {
        return res;
      }));
  }

  @Action(new StoreActionFactory(key).delete(null as string))
  delete(context: StateContext<StateModel>, action: ActionFactory) {
    const state = context.getState();
    const payload: string = action.payload instanceof Array ? action.payload[0] : action.payload;
    return this.storeService.delete(payload).pipe(
      tap(() => {
        context.patchState({
          ids: state.ids.filter((i: string) => i !== payload),
          entities: state.entities.filter((e: StoreEntity) => e.id !== payload),
          selectedEntities: []
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
