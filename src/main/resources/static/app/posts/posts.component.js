System.register(['angular2/core', 'angular2/http', './posts.http.service.js', '../users/users.http.service.js', '../navbar/spinner.component.js', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1, posts_http_service_1, users_http_service_1, spinner_component_1, Rx_1;
    var PostsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (posts_http_service_1_1) {
                posts_http_service_1 = posts_http_service_1_1;
            },
            function (users_http_service_1_1) {
                users_http_service_1 = users_http_service_1_1;
            },
            function (spinner_component_1_1) {
                spinner_component_1 = spinner_component_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            PostsComponent = (function () {
                function PostsComponent(_postHttpService, _userHttpService) {
                    this._postHttpService = _postHttpService;
                    this._userHttpService = _userHttpService;
                    this.isCommentLoading = false;
                    this.isPostsLoading = true;
                    this.selectedPagenationIndex = 0;
                    this.showPagenation = false;
                }
                PostsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    Rx_1.Observable.forkJoin(this._userHttpService.getUsers(), this._postHttpService.getPosts()).subscribe(function (res) {
                        _this.posts = res[1];
                        _this.users = res[0];
                    }, null, function () {
                        _this.isPostsLoading = false;
                        _this.checkPagenation();
                    });
                };
                PostsComponent.prototype.checkPagenation = function (pagenationIndex) {
                    if (this.posts.length <= 10) {
                        this.pagenationElements = undefined;
                        this.postsToShow = this.posts;
                        this.showPagenation = false;
                        return;
                    }
                    if (!pagenationIndex) {
                        pagenationIndex = 0;
                    }
                    this.showPagenation = true;
                    this.selectedPagenationIndex = pagenationIndex;
                    var pagenationCount = this.posts.length / 10;
                    this.pagenationElements = new Array();
                    for (var i = 0; i < pagenationCount; i++) {
                        this.pagenationElements.push(i);
                    }
                    this.postsToShow = this.posts.slice(pagenationIndex * 10, pagenationIndex * 10 + 10);
                };
                PostsComponent.prototype.select = function (post) {
                    var _this = this;
                    this.currentPost = post;
                    this.postComments = undefined;
                    this.isCommentLoading = true;
                    this._postHttpService.getPostComments(post.id).subscribe(function (postComments) {
                        _this.postComments = postComments;
                        _this.isCommentLoading = false;
                    });
                };
                PostsComponent.prototype.reloadPosts = function (filter) {
                    var _this = this;
                    this.posts = undefined;
                    this.isPostsLoading = true;
                    this.postComments = undefined;
                    this.currentPost = undefined;
                    this._postHttpService.getPosts(filter).subscribe(function (posts) {
                        _this.posts = posts;
                        _this.isPostsLoading = false;
                        _this.checkPagenation();
                    });
                };
                PostsComponent = __decorate([
                    core_1.Component({
                        templateUrl: '/hello/app/posts/posts.component.html',
                        providers: [http_1.HTTP_PROVIDERS, posts_http_service_1.PostsHttpService, users_http_service_1.UsersHttpService],
                        directives: [spinner_component_1.SpinnerComponent],
                        styles: ["\n        .posts li { cursor: default; }\n        .posts li:hover { background: #ecf0f1; } \n        .list-group-item.active, \n        .list-group-item.active:hover, \n        .list-group-item.active:focus { \n            background-color: #ecf0f1;\n            border-color: #ecf0f1; \n            color: #2c3e50;\n        }\n        .thumbnail{border-radius:100%;}\n    "],
                    }), 
                    __metadata('design:paramtypes', [posts_http_service_1.PostsHttpService, users_http_service_1.UsersHttpService])
                ], PostsComponent);
                return PostsComponent;
            }());
            exports_1("PostsComponent", PostsComponent);
        }
    }
});
//# sourceMappingURL=posts.component.js.map