import { HttpErrorResponse } from '@angular/common/http';
import { Action, Actions, Selector, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ActionFactory, StoreCrudActionFactory } from './store-crud-action.factory';
import { StoreCrudEntity } from './store-crud-entity.model';
import { initialState, StoreCrudStateModel } from './store-crud-state.model';
import { StoreCrudService } from './store-crud.service';


export interface StoreCrudStateSelectors {
    ids: (state: StoreCrudStateModel) => any[];
    entities: (state: StoreCrudStateModel) => any[];
    selectEntities: (state: StoreCrudStateModel) => any[];
    selectSelectedEntities: (state: StoreCrudStateModel) => any[];
    isSelectOneEntity: (state: StoreCrudStateModel) => boolean;
    isSelectManyEntities: (state: StoreCrudStateModel) => boolean;
    isSelectAllEntities: (state: StoreCrudStateModel) => boolean;
    error: (state: StoreCrudStateModel) => string;
}

export const key = 'store';

export class StoreCrudState {

    private static actions(): StoreCrudActionFactory<StoreCrudEntity> {
        return new StoreCrudActionFactory<StoreCrudEntity>(key);
    }

    @Selector()
    private static ids(state: StoreCrudStateModel, storeKey: string): any[] {
        return state[storeKey].ids;
    }

    @Selector()
    private static entities(state: StoreCrudStateModel, storeKey: string): any[] {
        return state[storeKey].entities;
    }

    @Selector()
    private static selectEntities(state: StoreCrudStateModel, storeKey: string): any[] {
        return state[storeKey].selectEntities;
    }

    @Selector()
    private static selectSelectedEntities(state: StoreCrudStateModel, storeKey: string): any[] {
        return state[storeKey].selectedEntities;
    }

    @Selector()
    private static isSelectOneEntity(state: StoreCrudStateModel, storeKey: string): boolean {
        return state[storeKey].isSelectOneEntity;
    }

    @Selector()
    private static isSelectManyEntities(state: StoreCrudStateModel, storeKey: string): boolean {
        return state[storeKey].isSelectManyEntities;
    }

    @Selector()
    private static isSelectAllEntities(state: StoreCrudStateModel, storeKey: string): boolean {
        return state[storeKey].isSelectAllEntities;
    }

    @Selector()
    private static error(state: StoreCrudStateModel, storeKey: string): string {
        return state[storeKey].error;
    }

    static selectors(storeKey: string): StoreCrudStateSelectors {
        return {
            ids: (state: StoreCrudStateModel) => StoreCrudState.ids(state, storeKey),
            entities: (state: StoreCrudStateModel) => StoreCrudState.entities(state, storeKey),
            selectEntities: (state: StoreCrudStateModel) => StoreCrudState.selectEntities(state, storeKey),
            selectSelectedEntities: (state: StoreCrudStateModel) => StoreCrudState.selectSelectedEntities(state, storeKey),
            isSelectOneEntity: (state: StoreCrudStateModel) => StoreCrudState.isSelectOneEntity(state, storeKey),
            isSelectManyEntities: (state: StoreCrudStateModel) => StoreCrudState.isSelectManyEntities(state, storeKey),
            isSelectAllEntities: (state: StoreCrudStateModel) => StoreCrudState.isSelectAllEntities(state, storeKey),
            error: (state: StoreCrudStateModel) => StoreCrudState.error(state, storeKey)
        };
    }

    constructor(public storeService: StoreCrudService<StoreCrudEntity>, public actions$: Actions) { }

    @Action(StoreCrudState.actions().search())
    search(context: StateContext<StoreCrudStateModel>) {
        return this.storeService.search().pipe(
            tap((res: StoreCrudEntity[]) => context.setState({
                ...initialState,
                ids: res.map(r => r.id),
                entities: res,
            })), catchError((error) => this.error(context, error)));
    }

    @Action(StoreCrudState.actions().create(null as StoreCrudEntity))
    create(context: StateContext<StoreCrudStateModel>, action: ActionFactory) {
        const state = context.getState();
        return this.storeService.create(action.payload).pipe(
            tap((res: StoreCrudEntity) => {
                context.patchState({
                    ...initialState,
                    ids: [...state.ids, res.id],
                    entities: [...state.entities, res],
                });
            }), catchError((error) => this.error(context, error)));
    }

    @Action(StoreCrudState.actions().selectedEntity(null as StoreCrudEntity))
    selectedEntity(context: StateContext<StoreCrudStateModel>, action: ActionFactory) {
        const state = context.getState();

        const unselectEntities = state.selectedEntities.filter(r => r.id === action.payload.id);

        const unselect = unselectEntities.length === 0; // no esta seleccionada

        const selectedEntities = unselect ? [...state.selectedEntities, ...action.payload] : [...state.selectedEntities.filter(r => r.id !== action.payload.id)];

        return context.patchState({
            ...state,
            selectedEntities: selectedEntities,
            isSelectOneEntity: selectedEntities.length === 1 ? true : false,
            isSelectManyEntities: selectedEntities.length > 1,
            isSelectAllEntites: selectedEntities.length === state.entities.length
        });
    }

    @Action(StoreCrudState.actions().update(null as StoreCrudEntity))
    update(context: StateContext<StoreCrudStateModel>, action: ActionFactory) {
        const state = context.getState();
        return this.storeService.update(action.payload).pipe(
            tap((res: StoreCrudEntity) => {
                context.patchState({
                    ids: [...state.ids, res.id],
                    entities: [...state.entities.filter(r => r.id !== res.id), res],
                });
            }), catchError((error) => this.error(context, error)));
    }

    @Action(StoreCrudState.actions().delete(null as string))
    delete(context: StateContext<StoreCrudStateModel>, action: ActionFactory) {
        const state = context.getState();
        const payload: string = action.payload instanceof Array ? action.payload[0] : action.payload;
        return this.storeService.delete(payload).pipe(
            tap(() => {
                context.patchState({
                    ids: state.ids.filter((i: string) => i !== payload),
                    entities: state.entities.filter((e: StoreCrudEntity) => e.id !== payload),
                    selectedEntities: [],
                    isSelectOneEntity: false
                });
            }), catchError((error) => this.error(context, error)));
    }

    @Action(StoreCrudState.actions().clearStore())
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
