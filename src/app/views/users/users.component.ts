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

    selectRow(entity: any) {
        super.selectRow(entity);
        this.isAdd = false;
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
        this.isEdit = false;
    }

    clear() {
        super.clear();
        this.isAdd = false;
    }

    edit() {
        this.isAdd = false;
        this.isEdit = true;
        this.store.dispatch(
            new UpdateFormValue({ value: this.store.selectSnapshot(this.selectors.selectSelectedEntities)[0], path: 'users.form' }));
    }

    delete() {
        this.isEdit = this.isAdd = false;
        super.delete();
    }

    cancel() {
        this.store.dispatch(new UpdateFormValue({ value: { name: '', password: '', active: true }, path: 'users.form' }));
        this.isAdd = false;
    }

}
