import { ActionFactory, StoreCrudActionFactory } from './store-crud-action.factory';
import { key, StoreCrudState } from './store-crud.state';

export function createStoreCrudPlugin(...storeKeys: string[]) {

    return function (state: StoreCrudState, action: ActionFactory, next: any) {

        for (const storeKey of storeKeys) {

            if (storeKey) {

                const generciAction = new StoreCrudActionFactory(storeKey);
                const actionsStore = new StoreCrudActionFactory(key);

                if (action.type === generciAction.search().type) {
                    return next(state, actionsStore.search());
                }

                if (action.type === generciAction.create(null).type) {
                    return next(state, actionsStore.create(action.payload));
                }

                if (action.type === generciAction.update(null).type) {
                    return next(state, actionsStore.update(action.payload));
                }

                if (action.type === generciAction.delete(null).type) {
                    return next(state, actionsStore.delete(action.payload));
                }

                if (action.type === generciAction.clearStore().type) {
                    return next(state, actionsStore.clearStore());
                }

                if (action.type === generciAction.selectedEntity(null).type) {
                    return next(state, actionsStore.selectedEntity(action.payload));
                }
              
                if (action.type === generciAction.setMode(null).type) {
                    return next(state, actionsStore.setMode(action.payload));
                }

            }

        };

        return next(state, action);

    };

}
