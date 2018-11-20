import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/login.service';
import { ErrorReport } from './ErrorReport';


@Injectable()
export class ErrorReportService {

  private options: RequestOptionsArgs;

  public errorReports: BehaviorSubject<ErrorReport[]> = new BehaviorSubject<ErrorReport[]>([]);

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


  public addErrorReport(report: ErrorReport): Observable<any> {
    report.message = report.message.replace(/(?:\r\n|\r|\n)/g, "<br />");
    return this.http.post("/db/api/error-reports", JSON.stringify(report), this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }


  public deleteReport(id: string): Observable<any> {
    return this.http.delete(`/db/api/error-reports/${id}`, this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

}
