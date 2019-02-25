import { StoreActionFactory } from './store-action.factory';
import { key } from './store.state';

export function createStorePlugin(storeKey: string) {

  return function (state, action, next) {

    if (storeKey) {

      const actionsUsers = new StoreActionFactory(storeKey);
      const actionsStore = new StoreActionFactory(key);

      if (action.type === actionsUsers.search().type) {
        return next(state, actionsStore.search());
      }

      if (action.type === actionsUsers.create(null).type) {
        return next(state, actionsStore.create(action.payload));
      }

      if (action.type === actionsUsers.update(null).type) {
        return next(state, actionsStore.update(action.payload));
      }

      if (action.type === actionsUsers.delete(null).type) {
        return next(state, actionsStore.delete(action.payload));
      }

      if (action.type === actionsUsers.clearStore().type) {
        return next(state, actionsStore.clearStore());
      }

      if (action.type === actionsUsers.selectedEntity(null).type) {
        return next(state, actionsStore.selectedEntity(action.payload));
      }

    }

    return next(state, action);

  };

}
