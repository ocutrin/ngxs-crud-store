import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { StoreComponent } from '../../core/store/store.component';
import { User } from './model/user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent extends StoreComponent<User> {

    static key = 'users';

    title = 'Users';

    isAdd = false;

    isEdit = false;

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
        if (this.isAdd) {
            super.add();
        } else if (this.isEdit) {
            super.edit();
        }
    }

    add() {
        this.isAdd = true;
    }

    edit() {
        this.store.dispatch(
            new UpdateFormValue({ value: this.store.selectSnapshot(this.selectors.selectSelectedEntities)[0], path: 'users.form' }));
        this.isEdit = true;
    }


    cancel() {
        this.store.dispatch(new UpdateFormValue({ value: { name: '', password: '', active: true }, path: 'users.form' }));
        this.isAdd = false;
    }

}
