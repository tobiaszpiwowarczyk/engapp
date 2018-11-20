import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { LoginService } from '../login/login.service';
import { UserStatistics } from './UserStatistics';
import { UserStatisticsInsertionData } from './UserStatisticsInsertionData';
import { mapToUserStatistics } from './user-statistics-utils';



@Injectable()
export class UserStatisticsService {

  private headers: Headers;
  private stompClient: any;

  onUserStatisticsAdd: BehaviorSubject<UserStatistics> = new BehaviorSubject<UserStatistics>(null);

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
    return this.http.get("/db/api/user/statistics", { headers: this.headers })
      .map(res => res.json().map(x => mapToUserStatistics(x)))
      .catch(err => Observable.throw(err.json()));
  }



  public findUserStats(): Observable<UserStatistics[]> {
    return this.http.get("/db/api/user/statistics/main", { headers: this.headers })
      .map(res => res.json().map(x => mapToUserStatistics(x)))
      .catch(err => Observable.throw(err.json()));
  }


  public connect(): void {
    const ws = new SockJS("/db/socket?access_token=" + this.ls.getAccessToken().replace("Bearer ", ""));
    this.stompClient = Stomp.over(ws);
    const self = this;
    this.stompClient.connect({ [this.ls.AUTHORIZATION_HEADER]: this.ls.getAccessToken() }, function () {
      self.stompClient.subscribe("/topic/user-statistics", (res) => self.parseData(res));
    });
  }

  public addUserStatistcs(stats: UserStatisticsInsertionData): void {
    this.stompClient.send("/app/add-user-statistics", {}, JSON.stringify(stats));
  }


  private parseData(res: any): void {
    this.onUserStatisticsAdd.next(mapToUserStatistics(JSON.parse(res.body)));
  }
}
