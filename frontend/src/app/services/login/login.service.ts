import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/map";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { User } from '../user/User';
import { Credentials } from './Credentials';

@Injectable()
export class LoginService {


  private readonly BEARER_PREFIX: string = "Bearer ";
  private loginHeaders: Headers;
  private user: User;
  private behaviorUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  public readonly AUTHORIZATION_HEADER: string = "Authorization";




  constructor(
    private http: Http,
    private router: Router
  ) {
    this.loginHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      [this.AUTHORIZATION_HEADER]: "Basic " + btoa("engapp-client:engapp-secret")
    });
  }




  public isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTHORIZATION_HEADER) != null;
  }




  public saveToken(accessToken: string): void {
    if (!accessToken.includes(this.BEARER_PREFIX))
      accessToken = this.BEARER_PREFIX + accessToken;

    localStorage.setItem(this.AUTHORIZATION_HEADER, accessToken);
  }

  public getUser(): User {
    return this.user;
  }

  public getUserData(): Observable<User> {
    return this.behaviorUser.asObservable();
  }

  public saveUserData(user: User): void {
    this.user = user;
    this.behaviorUser.next(user);
  }


  public getAccessToken(): string {
    return localStorage.getItem(this.AUTHORIZATION_HEADER);
  }



  public login(credentials: Credentials): Observable<any> {
    const body: URLSearchParams = new URLSearchParams();

    body.append("username", credentials.username);
    body.append("password", credentials.password);
    body.append("grant_type", "password");

    return this.http.post("http://localhost:8003/login", body, {headers: this.loginHeaders})
              .map(res => res.json())
              .map(res => {
                this.saveToken(res.access_token);
                this.account()
                  .subscribe((acc: User) => {
                    this.saveUserData(acc);
                    this.router.navigate(["/"]);
                  });
                return res;
              })
              .catch(err => Observable.throw(err.json()));
  }


  public account(): Observable<User> {

    const h = new Headers({
      [this.AUTHORIZATION_HEADER]: this.getAccessToken()
    });

    return this.http.get("/auth/api/user/account", {headers: h})
              .map(res => new User(res.json()))
              .catch(err => Observable.throw(err.json()));
  }


  public logout(): void {
    localStorage.removeItem(this.AUTHORIZATION_HEADER);
    localStorage.removeItem("scope");
    this.user = null;
    this.behaviorUser = new BehaviorSubject<User>(null);
    this.router.navigate(["/login"]);
  }

}
