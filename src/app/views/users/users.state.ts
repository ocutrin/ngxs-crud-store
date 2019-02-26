import { Actions, State } from '@ngxs/store';
import { StoreStateModel } from 'src/app/core/store/store-state.model';
import { initialState, StoreState } from '../../core/store/store.state';
import { UsersService } from './users.service';

@State<StoreStateModel>({
    name: 'users',
    defaults: initialState
})
export class UsersState extends StoreState {
    constructor(public storeService: UsersService, public actions$: Actions) {
        super(storeService, actions$);
    }

}
