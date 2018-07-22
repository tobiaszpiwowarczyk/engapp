import { Injectable } from '@angular/core';
import { Word } from './Word';

@Injectable()
export class WordService {

  constructor() {}

  public randomWord(): Word {
    return new Word({wordNumber: 1, english: "word", polish: "słowo"});
  }

}
