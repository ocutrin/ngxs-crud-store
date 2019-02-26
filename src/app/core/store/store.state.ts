import { HttpErrorResponse } from '@angular/common/http';
import { Action, Actions, Selector, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ActionFactory, StoreActionFactory } from './store-action.factory';
import { StoreEntity } from './store-entity.model';
import { StoreStateModel } from './store-state.model';
import { StoreService } from './store.service';

export const initialState: StoreStateModel = {
    ids: [],
    entities: [],
    selectedEntities: [],
    isSelectEntity: false,
    form: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
    },
    error: ''
};

export interface StoreStateSelectors {
    ids: (state: StoreStateModel) => any[];
    entities: (state: StoreStateModel) => any[];
    selectEntities: (state: StoreStateModel) => any[];
    selectSelectedEntities: (state: StoreStateModel) => any[];
    isSelectEntity: (state: StoreStateModel) => boolean;
    error: (state: StoreStateModel) => string;
}

export const key = 'store';

export class StoreState {

    @Selector()
    private static ids(state: StoreStateModel, storeKey: string): any[] {
        return state[storeKey].ids;
    }

    @Selector()
    private static entities(state: StoreStateModel, storeKey: string): any[] {
        return state[storeKey].entities;
    }

    @Selector()
    private static selectEntities(state: StoreStateModel, storeKey: string): any[] {
        return state[storeKey].selectEntities;
    }

    @Selector()
    private static selectSelectedEntities(state: StoreStateModel, storeKey: string): any[] {
        return state[storeKey].selectedEntities;
    }

    @Selector()
    private static isSelectEntity(state: StoreStateModel, storeKey: string): boolean {
        return state[storeKey].isSelectEntity;
    }

    @Selector()
    private static error(state: StoreStateModel, storeKey: string): string {
        return state[storeKey].error;
    }

    static selectors(storeKey: string): StoreStateSelectors {
        return {
            ids: (state: StoreStateModel) => StoreState.ids(state, storeKey),
            entities: (state: StoreStateModel) => StoreState.entities(state, storeKey),
            selectEntities: (state: StoreStateModel) => StoreState.selectEntities(state, storeKey),
            selectSelectedEntities: (state: StoreStateModel) => StoreState.selectSelectedEntities(state, storeKey),
            isSelectEntity: (state: StoreStateModel) => StoreState.isSelectEntity(state, storeKey),
            error: (state: StoreStateModel) => StoreState.error(state, storeKey)
        };
    }

    constructor(public storeService: StoreService<StoreEntity>, public actions$: Actions) { }

    @Action(new StoreActionFactory(key).search())
    search(context: StateContext<StoreStateModel>) {
        const state = context.getState();
        return this.storeService.search().pipe(
            tap((res: StoreEntity[]) => context.setState({
                ...state,
                ids: res.map(r => r.id),
                entities: res,
            })), catchError((error) => this.error(context, error)));
    }

    @Action(new StoreActionFactory(key).create(null as StoreEntity))
    create(context: StateContext<StoreStateModel>, action: ActionFactory) {
        const state = context.getState();
        return this.storeService.create(action.payload).pipe(
            tap((res: StoreEntity) => {
                context.patchState({
                    ids: [...state.ids, res.id],
                    entities: [...state.entities, res],
                });
            }), catchError((error) => this.error(context, error)));
    }

    @Action(new StoreActionFactory(key).selectedEntity(null as StoreEntity))
    selectedEntity(context: StateContext<StoreStateModel>, action: ActionFactory) {
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
    update(context: StateContext<StoreStateModel>, action: ActionFactory) {
        const state = context.getState();
        return this.storeService.update(action.payload).pipe(
            tap((res: StoreEntity) => {
                context.patchState({
                    ids: [...state.ids, res.id],
                    entities: [...state.entities.filter(r => r.id !== res.id), res],
                });
            }), catchError((error) => this.error(context, error)));
    }

    @Action(new StoreActionFactory(key).delete(null as string))
    delete(context: StateContext<StoreStateModel>, action: ActionFactory) {
        const state = context.getState();
        const payload: string = action.payload instanceof Array ? action.payload[0] : action.payload;
        return this.storeService.delete(payload).pipe(
            tap(() => {
                context.patchState({
                    ids: state.ids.filter((i: string) => i !== payload),
                    entities: state.entities.filter((e: StoreEntity) => e.id !== payload),
                    selectedEntities: []
                });
            }), catchError((error) => this.error(context, error)));
    }

    @Action(new StoreActionFactory(key).clearStore())
    clearStore(context: StateContext<any>) {
        return context.setState(initialState);
    }

    private error(context: any, error: any): Observable<string> {
        let errorMessage: string;
        if (error instanceof HttpErrorResponse) {
            errorMessage = `status: ${error.status} \nmessage: ${error.statusText}`;
        } else {
            errorMessage = 'Unknow error';
        }
        return context.patchState({ ...context.getState(), error: errorMessage });
    }

}
