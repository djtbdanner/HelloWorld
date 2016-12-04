System.register(['angular2/core', 'angular2/common', './emailValidator', 'angular2/http', 'angular2/router', './users.http.service', './user', '../navbar/spinner.component'], function(exports_1, context_1) {
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
    var core_1, common_1, emailValidator_1, http_1, router_1, users_http_service_1, user_1, router_2, spinner_component_1;
    var AddUserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (emailValidator_1_1) {
                emailValidator_1 = emailValidator_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (users_http_service_1_1) {
                users_http_service_1 = users_http_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (spinner_component_1_1) {
                spinner_component_1 = spinner_component_1_1;
            }],
        execute: function() {
            AddUserComponent = (function () {
                function AddUserComponent(fb, _userHttpService, _router, _routeParams) {
                    this._userHttpService = _userHttpService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.isSubmitting = false;
                    this.user = new user_1.User();
                    this.isLoading = false;
                    this.header = "New User";
                    this.form = fb.group({
                        name: ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(4)])],
                        email: ['', common_1.Validators.compose([common_1.Validators.required, emailValidator_1.EmailValidator.isInvalidEmailAddress])],
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
                AddUserComponent.prototype.routerCanDeactivate = function (next, previous) {
                    if (this.form.dirty) {
                        if (this.isSubmitting) {
                            return;
                        }
                        return confirm("This form has been modified, are you sure you want to navigate away without saving changes?");
                    }
                };
                AddUserComponent.prototype.ngOnInit = function () {
                    var userId = this._routeParams.get("userId");
                    if (!userId) {
                        return;
                    }
                    this.isLoading = true;
                    this.header = "Edit User";
                    this.getUser(userId);
                };
                AddUserComponent.prototype.submitForm = function () {
                    var _this = this;
                    this.isSubmitting = true;
                    var id = this.user.id;
                    if (!id) {
                        this._userHttpService.addUser(this.user).subscribe(function (x) {
                            _this._router.navigate(['Users']);
                        });
                    }
                    else {
                        this._userHttpService.saveUser(this.user, id).subscribe(function (x) {
                            _this._router.navigate(['Users']);
                        });
                    }
                };
                AddUserComponent.prototype.getUser = function (id) {
                    var _this = this;
                    this._userHttpService.getUser(id).subscribe(function (user) {
                        _this.user = user;
                        _this.isLoading = false;
                    }, function (response) {
                        if (response.status == 404) {
                            _this._router.navigate(['NotFound']);
                        }
                    });
                };
                AddUserComponent = __decorate([
                    core_1.Component({
                        templateUrl: '/app/users/adduser.component.html',
                        styles: [".ng-touched.ng-invalid	{border:	1px	solid	red;}"],
                        providers: [http_1.HTTP_PROVIDERS, users_http_service_1.UsersHttpService],
                        directives: [spinner_component_1.SpinnerComponent]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, users_http_service_1.UsersHttpService, router_1.Router, router_2.RouteParams])
                ], AddUserComponent);
                return AddUserComponent;
            }());
            exports_1("AddUserComponent", AddUserComponent);
        }
    }
});
//# sourceMappingURL=adduser.component.js.map