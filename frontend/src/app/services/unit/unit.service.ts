import { Headers, RequestOptionsArgs } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Unit } from '../../modules/home/components/unit/Unit';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/throw";

@Injectable()
export class UnitService {

  private headers: Headers;
  private options: RequestOptionsArgs;

  constructor(
    private http: Http,
    private ls: LoginService
  ) {
    this.headers = new Headers();
    this.headers.append(this.ls.AUTHORIZATION_HEADER, this.ls.getAccessToken());

    this.options = {
      headers: this.headers
    };
  }

  public findAll(): Observable<Array<Unit>> {
    return this.http.get("/db/api/unit", this.options)
      .map(res => res.json().map(x => new Unit(x)))
      .catch(err => Observable.throw(err.json()));
  }

  public findById(id: string): Promise<Unit> {
    return this.http.get(`/db/api/unit/${id}`, this.options)
      .map(res => new Unit(res.json()))
      .catch(err => Observable.throw(err))
      .toPromise();
  }

}
