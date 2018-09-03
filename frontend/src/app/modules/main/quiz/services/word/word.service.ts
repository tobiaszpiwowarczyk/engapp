import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../../../../services/login/login.service';
import { Word } from './Word';


@Injectable()
export class WordService {

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

  public randomWord(unitId: string, id: number): Observable<Word> {
    return this.http.get(`/db/api/word/${unitId}/${id}`, this.options)
        .map(res => new Word(res.json()))
        .catch(err => Observable.throw(err))
        .map(res => {
          if(res.english.includes("/"))
            res.english = res.english.split("/");
          return res;
        });
  }

}
