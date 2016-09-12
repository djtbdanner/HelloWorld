import {Component, OnInit} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {EmailValidator} from './emailValidator';
import {HTTP_PROVIDERS} from 'angular2/http';
import {CanDeactivate, Router } from 'angular2/router';
import {UsersHttpService } from './users.http.service';
import {User, Address} from './user'
import {RouteParams} from 'angular2/router';
import {SpinnerComponent} from '../navbar/spinner.component'

@Component({
    templateUrl: '/hello/app/users/adduser.component.html',
    styles: [".ng-touched.ng-invalid	{border:	1px	solid	red;}"],
    providers: [HTTP_PROVIDERS, UsersHttpService],
    directives: [SpinnerComponent]
})
export class AddUserComponent implements CanDeactivate, OnInit {

    form: ControlGroup;
    isSubmitting = false;
    user = new User();
    isLoading = false;
    header = "New User";

    constructor(fb: FormBuilder, private _userHttpService: UsersHttpService, private _router: Router, private _routeParams: RouteParams) {

        this.form = fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            email: ['', Validators.compose([Validators.required, EmailValidator.isInvalidEmailAddress])],
            phone: [],
            id: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []
            })
        });
    }

    routerCanDeactivate(next, previous) {

        if (this.form.dirty) {
            if (this.isSubmitting) {
                return;
            }
            return confirm("This form has been modified, are you sure you want to navigate away without saving changes?");
        }
    }

    ngOnInit() {
        var userId = this._routeParams.get("userId");

        if (!userId) {
            return;
        }

        this.isLoading = true;
        this.header = "Edit User";
        this.getUser(userId);

    }

    submitForm() {
        this.isSubmitting = true;
        var id = this.user.id;
        if (!id) {
            this._userHttpService.addUser(this.user).subscribe(x => {
                this._router.navigate(['Users']);
            });
        } else {
            this._userHttpService.saveUser(this.user, id).subscribe(x => {
                this._router.navigate(['Users']);
            });
        }

    }


    getUser(id) {
        this._userHttpService.getUser(id).subscribe(user => {
            this.user = user;
            this.isLoading = false;
        },
            response => {
                if (response.status == 404) {
                    this._router.navigate(['NotFound']);
                }
            }
        );
    }
}  