import { StoreEntity } from '../../../core/store/store-entity.model';

export class User implements StoreEntity {
  id: string;
  name: string;
  password: string;
  active: boolean;
}
