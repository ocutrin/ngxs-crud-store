import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreCrudActionFactory } from './store-crud-action.factory';
import { StoreCrudEntity } from './store-crud-entity.model';
import { StoreCrudState, StoreCrudStateSelectors } from './store-crud.state';

export abstract class StoreCrudComponent<T extends StoreCrudEntity> implements OnInit {

    private _ids$: Observable<string[]>;

    get ids$() {
        return this._ids$;
    }

    private _entities$: Observable<T[]>;

    get entities$() {
        return this._entities$;
    }

    private _selectEntities$: Observable<T[]>;

    get selectEntities$() {
        return this._selectEntities$;
    }

    private _isSelectEntity$: Observable<boolean>;

    get isSelectEtntity$() {
        return this._isSelectEntity$;
    }

    private _error$: Observable<string>;

    get error$() {
        return this._error$;
    }

    private _actions: StoreCrudActionFactory<T>;

    get actions() {
        return this._actions;
    }

    private _selectors: StoreCrudStateSelectors;

    get selectors() {
        return this._selectors;
    }

    private _form: FormGroup;

    get form() {
        return this._form;
    }

    constructor(private key, public store: Store, public formBuilder: FormBuilder) {
        this._actions = new StoreCrudActionFactory(this.key);
        this._selectors = StoreCrudState.selectors(this.key);
        this._form = this.formBuilder.group(this.initForm());
        this._ids$ = this.store.select(this.selectors.ids);
        this._entities$ = this.store.select(this.selectors.entities);
        this._selectEntities$ = this.store.select(this.selectors.selectEntities);
        this._isSelectEntity$ = this.store.select(this.selectors.isSelectEntity);
        this._error$ = this.store.select(this.selectors.error);
    }

    abstract initForm(): any;

    ngOnInit() {
        this.search();
    }

    search() {
        this.store.dispatch(this.actions.search());
    }

    clear() {
        this.store.dispatch(this.actions.clearStore());
    }

    add() {
        if (this.form.valid) {
            this.store.dispatch(this.actions.create(this.form.value));
            this.form.reset();
        }
    }

    edit() {
        if (this.form.valid) {
            const e = this.store.selectSnapshot(this.selectors.selectSelectedEntities)[0];
            this.store.dispatch(this.actions.update({ id: e.id, ...this.form.value }));
            this.form.reset();
        }
    }

    delete() {
        this.store.dispatch(this.actions.delete(
            this.store.selectSnapshot(this.selectors.selectSelectedEntities).map((e: any) => e.id)[0]));
    }

    selectRow(entity: any) {
        this.store.dispatch(this.actions.selectedEntity(entity));
    }

    getClassName(entity: any) {
        return this.store.selectSnapshot(state => state.users.selectedEntities)
            .filter((r: any) => r.id === entity.id).length > 0 ? 'selected' : '';
    }

}