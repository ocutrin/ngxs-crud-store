import { Actions, State } from '@ngxs/store';
import { initialState, StateModel, StoreState } from '../../core/store/store.state';
import { UsersService } from './users.service';


@State<StateModel>({
  name: 'users',
  defaults: initialState
})
export class UsersState extends StoreState {
  constructor(public servicio: UsersService, public actions$: Actions) {
    super(servicio, actions$);
  }

}
