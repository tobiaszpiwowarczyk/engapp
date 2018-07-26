export class Unit {
  id: string;
  name: string;
  color: string;
  wordsCount?: number;
  words?: Array<any>;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}