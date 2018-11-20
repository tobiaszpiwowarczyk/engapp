import { Word } from "../../../../../services/word/Word";

export class Unit {
  id: string;
  name: string;
  color: string;
  image?: string;
  wordsCount?: number;
  words?: Array<Word>;
  published: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}