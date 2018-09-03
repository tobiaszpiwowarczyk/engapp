import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/login.service';
import { User } from './User';


@Injectable()
export class UserService {

  private headers: Headers;
  private accountHeaders: Headers;

  constructor(
    private http: Http,
    private ls: LoginService
  ) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");

    this.accountHeaders = new Headers();
    this.accountHeaders.append("Content-Type", "application/json");
    this.accountHeaders.append(this.ls.AUTHORIZATION_HEADER, this.ls.getAccessToken());

  }


  public findAll(): Observable<User[]> {
    return this.http.get("/auth/api/user", {headers: this.accountHeaders})
            .map(res => res.json())
            .catch(err => Observable.throw(err));
  }

  findByUsername(username: string): Observable<User> {
    return this.http.get("/auth/api/user/" + username, {headers: this.accountHeaders})
      .map(res => new User(res.json()))
      .catch(err => Observable.throw(err));
  }

  public register(user: User): Observable<any> {
    return this.http.post("/register", JSON.stringify(user), {headers: this.headers})
            .map(res => new User(res.json()))
            .catch(err => Observable.throw(err.json().errors));
  }

  // todo: catch http error status
  public validateRegister(user: User, field: string = ""): Observable<any> {
    return this.http.post(`/auth/api/user/validate?field=${field}`, JSON.stringify(user), {headers: this.headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put("/auth/api/user", JSON.stringify(user), {headers: this.accountHeaders})
        .map(res => new User(res.json()))
        .catch(err => Observable.throw(err.json().errors));
  }

  // todo: catch http error status
  public validateUpdateUser(user: User, field: string = ""): Observable<any> {
    return this.http.put(`/auth/api/user/validate?field=${field}`, JSON.stringify(user), {headers: this.accountHeaders})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
  }



  public account(): Observable<User> {
    return this.http.get("/auth/api/user/account", {headers: this.accountHeaders})
              .map(res => new User(res.json()))
              .catch(err => Observable.throw(err.json()));
  }


}
