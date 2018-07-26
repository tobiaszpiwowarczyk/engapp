import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { Credentials } from './Credentials';

@Injectable()
export class LoginService {


  private readonly BEARER_PREFIX: string = "Bearer ";
  private loginHeaders: Headers;

  public readonly AUTHORIZATION_HEADER: string = "Authorization";
  public readonly USER_DATA: string = "userData";




  constructor(
    private http: Http,
    private router: Router
  ) {
    this.loginHeaders = new Headers();
    this.loginHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    this.loginHeaders.append(this.AUTHORIZATION_HEADER, "Basic ZW5nYXBwLWNsaWVudDplbmdhcHAtc2VjcmV0");
  }




  public isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTHORIZATION_HEADER) != null;
  }




  public saveToken(accessToken: string): void {
    if (!accessToken.includes(this.BEARER_PREFIX))
      accessToken = this.BEARER_PREFIX + accessToken;

    localStorage.setItem(this.AUTHORIZATION_HEADER, accessToken);
  }



  public saveUserData(data: any): void {
    localStorage.setItem(this.USER_DATA, JSON.stringify(data));
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
                this.router.navigate(["/"]);
                return res;
              })
              .catch(err => Observable.throw(err.json()));
  }


  public logout(): void {
    localStorage.removeItem(this.AUTHORIZATION_HEADER);
    localStorage.removeItem(this.USER_DATA);
    this.router.navigate(["/login"]);
  }

}
