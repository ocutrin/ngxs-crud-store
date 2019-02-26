import { StoreEntity } from './store-entity.model';

export interface StoreStateModel {
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
    error: string;
}
