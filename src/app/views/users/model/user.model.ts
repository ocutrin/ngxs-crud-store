import { StoreCrudEntity } from '../../../core/store/store-crud-entity.model';

export class User implements StoreCrudEntity {
  id: string;
  name: string;
  password: string;
  active: boolean;
}
