import { StoreEntity } from '../../../core/store/store-entity';

export class User implements StoreEntity {
  id: string;
  name: string;
  password: string;
  active: boolean;
}
