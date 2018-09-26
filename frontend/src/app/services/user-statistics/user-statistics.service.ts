import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/login.service';
import { mapToUserStatistics, UserStatistics, UserStatisticsInsertionData } from './UserStatistics';


@Injectable()
export class UserStatisticsService {

  private headers: Headers;

  constructor(
    private http: Http,
    private ls: LoginService
  ) {
    this.headers = new Headers({
      "Content-Type": "application/json",
      [this.ls.AUTHORIZATION_HEADER]: this.ls.getAccessToken()
    });
  }



  public findAll(): Observable<UserStatistics[]> {
    return this.http.get("/db/api/user/statistics", {headers: this.headers})
      .map(res => res.json().map(x => mapToUserStatistics(x)))
      .catch(err => Observable.throw(err.json()));
  }



  public findUserStats(): Observable<UserStatistics[]> {
    return this.http.get("/db/api/user/statistics/main", {headers: this.headers})
      .map(res => res.json().map(x => mapToUserStatistics(x)))
      .catch(err => Observable.throw(err.json()));
  }


  public addUserStatistcs(stats: UserStatisticsInsertionData): Observable<any> {
    return this.http.post("/db/api/user/statistics", JSON.stringify(stats), {headers: this.headers})
      .catch(err => Observable.throw(err.json()));
  }

}
