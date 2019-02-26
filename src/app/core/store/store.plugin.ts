import { StoreActionFactory } from './store-action.factory';
import { key } from './store.state';

export function createStorePlugin(...storeKeys: string[]) {

    return function (state, action, next) {

        for (const storeKey in storeKeys) {

            if (storeKey) {

                const generciAction = new StoreActionFactory(storeKey);
                const actionsStore = new StoreActionFactory(key);

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

            }

        };

        return next(state, action);

    };

}
