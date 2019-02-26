import { StoreEntity } from './store-entity';

export interface ActionFactory {
  readonly type: string;
  payload?: any;
}

export const createAction = function (tag: string, action: string, _payload?: any) {
  class DinamicAction {
    readonly type: string = `[${tag.toUpperCase()}] ${action.toUpperCase()}`;
    constructor(public payload = _payload) { }
  }
  return new DinamicAction();
};

export class StoreActionFactory<T extends StoreEntity>  {

  constructor(private tag: string) { }

  search(): ActionFactory {
    return createAction(this.tag, `SEARCH`);
  }

  create(entity: T): ActionFactory {
    return createAction(this.tag, `CREATE`, entity);
  }

  update(entity: T): ActionFactory {
    return createAction(this.tag, `UPDATE`, entity);
  }

  delete(id: string): ActionFactory {
    return createAction(this.tag, `DELETE`, id);
  }

  error(error: T): ActionFactory {
    return createAction(this.tag, `ERROR`, error);
  }

  clearStore(): ActionFactory {
    return createAction(this.tag, `CLEAR STORE`);
  }

  selectedEntity(entity: T): ActionFactory {
    return createAction(this.tag, `SELECTED ENTITY`, entity);
  }

}

