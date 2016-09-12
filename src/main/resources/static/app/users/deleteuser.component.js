System.register(['angular2/core', 'angular2/router', 'angular2/http', './users.http.service.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, users_http_service_1, router_2;
    var DeleteUserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (users_http_service_1_1) {
                users_http_service_1 = users_http_service_1_1;
            }],
        execute: function() {
            DeleteUserComponent = (function () {
                function DeleteUserComponent(_routeParams, _userHttpService, _router) {
                    this._routeParams = _routeParams;
                    this._userHttpService = _userHttpService;
                    this._router = _router;
                    this.isDeleting = false;
                }
                DeleteUserComponent.prototype.ngOnInit = function () {
                    this.userId = this._routeParams.get("userId");
                };
                DeleteUserComponent.prototype.deleteuser = function () {
                    var _this = this;
                    this.isDeleting = true;
                    this._userHttpService.deleteUser(this.userId).subscribe(function (x) {
                        _this._router.navigate(['Users']);
                    }, function (response) {
                        if (response.status == 404) {
                            _this.isDeleting = false;
                        }
                    });
                };
                DeleteUserComponent = __decorate([
                    core_1.Component({
                        template: "\n    <div *ngIf = \"!isDeleting\">\n        <h1 (click) = \"deleteuser()\" >Tap to delete user {{userId}} !</h1>\n    </div>\n    <div *ngIf = \"isDeleting\">\n        <h2>...deleting user {{userId}}</h2>\n    </div>\n    ",
                        styles: ["h1{cursor:pointer}"],
                        providers: [http_1.HTTP_PROVIDERS, users_http_service_1.UsersHttpService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, users_http_service_1.UsersHttpService, router_2.Router])
                ], DeleteUserComponent);
                return DeleteUserComponent;
            }());
            exports_1("DeleteUserComponent", DeleteUserComponent);
        }
    }
});
//# sourceMappingURL=deleteuser.component.js.map