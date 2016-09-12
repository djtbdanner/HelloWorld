import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {UsersHttpService} from './users.http.service';
import {Router } from 'angular2/router';

@Component({
    template: `
    <div *ngIf = "!isDeleting">
        <h1 (click) = "deleteuser()" >Tap to delete user {{userId}} !</h1>
    </div>
    <div *ngIf = "isDeleting">
        <h2>...deleting user {{userId}}</h2>
    </div>
    `,
    styles: ["h1{cursor:pointer}"],
    providers: [HTTP_PROVIDERS, UsersHttpService]
})
export class DeleteUserComponent implements OnInit {
    userId;
    isDeleting = false;

    constructor(private _routeParams: RouteParams, private _userHttpService: UsersHttpService, private _router: Router) {
    }

    ngOnInit() {
        this.userId = this._routeParams.get("userId");
    }

    deleteuser() {
        this.isDeleting = true;
        this._userHttpService.deleteUser(this.userId).subscribe(x => {
            this._router.navigate(['Users']);
        }, response => {
            if (response.status == 404) {
                this.isDeleting = false;
            }
        }
        );
    }
}  