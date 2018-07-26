import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/login.service';
import { User } from './User';


@Injectable()
export class UserService {

  private headers: Headers;
  private options: RequestOptionsArgs;

  constructor(
    private http: Http,
    private ls: LoginService
  ) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");

    this.options = {
      headers: this.headers
    };

  }


  public register(user: User): Observable<any> {
    return this.http.post("/auth/api/user", JSON.stringify(user), this.options)
            .map(res => new User(res.json()))
            .catch(err => Observable.throw(err.json().errors));
  }




  public getUserData(): User {
    return JSON.parse(localStorage.getItem(this.ls.USER_DATA));
  }



  public account(): Observable<User> {

    const h = new Headers();
    h.append(this.ls.AUTHORIZATION_HEADER, this.ls.getAccessToken());

    return this.http.get("/auth/api/user/account", {headers: h})
              .map(res => new User(res.json()))
              .catch(err => Observable.throw(err.json()));
  }


}
