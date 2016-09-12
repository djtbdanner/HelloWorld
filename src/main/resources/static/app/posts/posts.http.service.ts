
import {Http} from 'angular2/http'
import {Injectable} from 'angular2/core'
import 'rxjs/add/operator/map';


@Injectable()
export class PostsHttpService {
    private _url = "http://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http) {
    }

    getPosts(filter?) {
        if (filter && filter.userId){
             return this._http.get(this._url + "?userId=" + filter.userId).map(res => res.json());
        }
        return this._http.get(this._url).map(res => res.json());
    }

    getPostComments(postId) {
        return this._http.get(this._url + "/" + postId + "/comments").map(res => res.json());
    }

}
