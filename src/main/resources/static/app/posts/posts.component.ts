import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {PostsHttpService} from './posts.http.service';
import {UsersHttpService} from '../users/users.http.service';
import {Post, PostHash} from './post'
import {PostComment} from './comment';
import {SpinnerComponent} from '../navbar/spinner.component';
import {User} from '../users/user';
import {Observable} from 'rxjs/Rx';

@Component({
    templateUrl: '/app/posts/posts.component.html',
    providers: [HTTP_PROVIDERS, PostsHttpService, UsersHttpService],
    directives: [SpinnerComponent],
    styles: [`
        .posts li { cursor: default; }
        .posts li:hover { background: #ecf0f1; } 
        .list-group-item.active, 
        .list-group-item.active:hover, 
        .list-group-item.active:focus { 
            background-color: #ecf0f1;
            border-color: #ecf0f1; 
            color: #2c3e50;
        }
        .thumbnail{border-radius:100%;}
    `],
})
export class PostsComponent implements OnInit {
    isCommentLoading = false;
    isPostsLoading = true;
    posts: Post[];
    currentPost: Post;
    postComments: PostComment[];
    users: User[];
    selectedPagenationIndex = 0;
    postsToShow:Post[];
    pagenationElements:any[];
    showPagenation = false;

    constructor(private _postHttpService: PostsHttpService, private _userHttpService: UsersHttpService) {

    }
    ngOnInit() {
        Observable.forkJoin(
            this._userHttpService.getUsers(),
            this._postHttpService.getPosts()
        ).subscribe(
            res => {
                this.posts = res[1];
                this.users = res[0];
            },
            null,
            () => {
                this.isPostsLoading = false;
                this.checkPagenation();
            }
            );

    }

    checkPagenation(pagenationIndex?) {
        if(this.posts.length <= 10){
            this.pagenationElements = undefined;
            this.postsToShow =this.posts;
            this.showPagenation = false;
            return;
        }
        if(!pagenationIndex){
            pagenationIndex = 0;
        }
        this.showPagenation = true;
        this.selectedPagenationIndex=pagenationIndex;
        var pagenationCount = this.posts.length /10;
        this.pagenationElements = new Array();
        for (var i = 0; i < pagenationCount; i++){
            this.pagenationElements.push(i);
        }
        this.postsToShow = this.posts.slice(pagenationIndex*10,pagenationIndex*10+ 10);
    }

    select(post) {
        this.currentPost = post;
        this.postComments = undefined;
        this.isCommentLoading = true;
        this._postHttpService.getPostComments(post.id).subscribe(postComments => {
            this.postComments = postComments;
            this.isCommentLoading = false;
        });
    }

    reloadPosts(filter) {
        this.posts = undefined;
        this.isPostsLoading = true;
        this.postComments = undefined;
        this.currentPost = undefined;
        this._postHttpService.getPosts(filter).subscribe(posts => {
            this.posts = posts;
            this.isPostsLoading = false;
            this.checkPagenation();
        });

    }
}  