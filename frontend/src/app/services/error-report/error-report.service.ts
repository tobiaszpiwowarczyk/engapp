import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { LoginService } from '../login/login.service';
import { ErrorReport } from './ErrorReport';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorReportService {

  private options: RequestOptionsArgs;

  constructor(
    private http: Http,
    private ls: LoginService
  ) {
    this.options = {
      headers: new Headers({
        "Content-Type": "application/json",
        [this.ls.AUTHORIZATION_HEADER]: this.ls.getAccessToken()
      })
    };
  }



  public findAll(): Observable<ErrorReport[]> {
    return this.http.get("/db/api/error-reports", this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }


  public findById(id: string): Observable<ErrorReport> {
    return this.http.get(`/db/api/error-reports/${id}`, this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }


  public markAsRead(id: string[]): Observable<any> {
    return this.http.put("/db/api/error-reports/mark-as-read", JSON.stringify({ reportIds: id, read: true }), this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }


  public deleteReport(id: string): Observable<any> {
    return this.http.delete(`/db/api/error-reports/${id}`, this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

}
