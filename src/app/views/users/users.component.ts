import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { StoreCrudComponent } from '../../core/store-crud/store-crud.component';
import { User } from './model/user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent extends StoreCrudComponent<User> {

    title = 'Users';

    constructor(public store: Store, public formBuilder: FormBuilder) {
        super('users', store, formBuilder);
        this.error$.subscribe(error => {
            if (error) {
                alert(error);
            }
        });
    }

    initForm() {
        return {
            name: ['', Validators.required],
            password: ['', Validators.required],
            active: [true, Validators.required]
        };
    }

    save() {
        // super.add();
        // super.edit();
    }

    add() {
        this.store.dispatch(this.actions.setMode('add'));
    }

    edit() {
        this.store.dispatch(this.actions.setMode('edit'));
    }

    cancel() {
        this.store.dispatch(this.actions.setMode('list'));
        this.store.dispatch(new UpdateFormValue({
            value: { name: '', password: '', active: true }, path: 'users.form'
        }));
    }

    click() {
        console.log('click', event);
    }

}
