import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/login.service';
import { Word, WordCreationEntity, WordEditionEntity } from './Word';


@Injectable()
export class WordService {

  private headers: Headers;
  private options: RequestOptionsArgs;

  constructor(
    private http: Http,
    private ls: LoginService
  ) {
    this.headers = new Headers({
      "Content-Type": "application/json",
      [this.ls.AUTHORIZATION_HEADER]: this.ls.getAccessToken()
    });

    this.options = {
      headers: this.headers
    };
  }

  public randomWord(unitId: string, id: number): Observable<Word> {
    return this.http.get(`/db/api/word/${unitId}/${id}`, this.options)
        .map(res => new Word(res.json()))
        .catch(err => Observable.throw(err.json()));
  }

  public addWord(word: WordCreationEntity): Observable<Word> {
    return this.http.post(`/db/api/word`, JSON.stringify(word), this.options)
      .map(res => new Word(res.json()))
      .catch(err => Observable.throw(err.json()));
  }

  public addWordValidation(word: WordCreationEntity, field: string): Observable<any> {
    return this.http.post(`/db/api/word/validate?field=${field}`, JSON.stringify(word), this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

  public editWord(unitId: string, word: Word): Observable<Word> {
    return this.http.put(`/db/api/word/${unitId}`, JSON.stringify(word), this.options)
      .map(res => new Word(res.json()))
      .catch(err => Observable.throw(err.json()));
  }

  public editWordValidation(word: WordEditionEntity, field: string): Observable<any> {
    return this.http.put(`/db/api/word/validate?field=${field}`, JSON.stringify(word), this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

  public deleteWord(unitId: string, wordNumber: number): Observable<any> {
    return this.http.delete(`/db/api/word/${unitId}/${wordNumber}`, this.options)
    .map(res => res.json())
    .catch(err => Observable.throw(err.json()));
  }
}
