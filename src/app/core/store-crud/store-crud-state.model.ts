import { StoreCrudEntity } from './store-crud-entity.model';

export interface StoreCrudStateModel {
    ids: string[];
    entities: StoreCrudEntity[];
    selectedEntities: StoreCrudEntity[];
    isSelectOneEntity: boolean;
    isSelectManyEntities: boolean;
    isSelectAllEntites: boolean;
    mode: 'add' | 'edit' | 'list';
    form: {
        model: StoreCrudEntity,
        dirty: boolean,
        status: string,
        errors: any
    };
    error: string;
}

export const initialState: StoreCrudStateModel = {
    ids: [],
    entities: [],
    selectedEntities: [],
    isSelectOneEntity: false,
    isSelectManyEntities: false,
    isSelectAllEntites: false,
    mode: 'list',
    form: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
    },
    error: ''
};