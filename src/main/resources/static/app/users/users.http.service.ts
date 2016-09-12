
import {Http} from 'angular2/http'
import {Injectable} from 'angular2/core'
import 'rxjs/add/operator/map';


@Injectable()
export class UsersHttpService {
    private _url = "https://jsonplaceholder.typicode.com/users";

    constructor(private _http: Http) {
    }

    getUsers() {
        return this._http.get(this._url).map(res => res.json());
    }

    addUser(user) {
        return this._http.post(this._url, JSON.stringify(user)).map(res => res.json());
    }

    saveUser(user, id) {
        return this._http.put(this.getUserUrl(id), JSON.stringify(user)).map(res => res.json());
    }

    deleteUser(id) {
        return this._http.delete(this.getUserUrl(id)).map(res => res.json());
    }


    getUser(id) {
        return this._http.get(this.getUserUrl(id)).map(res => res.json());
    }

    private getUserUrl(userId) {
        return this._url + "/" + userId;
    }
}
