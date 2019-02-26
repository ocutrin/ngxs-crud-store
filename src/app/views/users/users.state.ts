import { Actions, State } from '@ngxs/store';
import { initialState, StoreCrudStateModel } from 'src/app/core/store/store-crud-state.model';
import { StoreCrudState } from '../../core/store/store-crud.state';
import { UsersService } from './users.service';

@State<StoreCrudStateModel>({
    name: 'users',
    defaults: initialState
})
export class UsersState extends StoreCrudState {
    constructor(public storeService: UsersService, public actions$: Actions) {
        super(storeService, actions$);
    }

}
