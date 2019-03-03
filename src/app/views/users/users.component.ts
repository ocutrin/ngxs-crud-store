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

    static key = 'users';

    title = 'Users';

    mode: 'add' | 'edit' | 'list' = 'list';

    constructor(public store: Store, public formBuilder: FormBuilder) {
        super(UsersComponent.key, store, formBuilder);
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
        if (this.mode === 'add') {
            super.add();
        } else if (this.mode === 'edit') {
            super.edit();
        }
    }

    add() {
        this.mode = 'add';
    }

    edit() {
        this.mode = 'edit';
        this.store.dispatch(new UpdateFormValue({
            value: this.store.selectSnapshot(this.selectors.selectSelectedEntities)[0], path: 'users.form'
        }));
    }

    delete() {
        super.delete();
    }

    cancel() {
        this.mode = 'list';
        this.store.dispatch(new UpdateFormValue({
            value: { name: '', password: '', active: true }, path: 'users.form'
        }));
    }


    click() {
        console.log('click', event);
    }

}
