import { StoreCrudEntity } from './store-crud-entity.model';

export interface StoreCrudStateModel {
    ids: string[];
    entities: StoreCrudEntity[];
    selectedEntities: StoreCrudEntity[];
    isSelectEntity: boolean;
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
    isSelectEntity: false,
    form: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
    },
    error: ''
};