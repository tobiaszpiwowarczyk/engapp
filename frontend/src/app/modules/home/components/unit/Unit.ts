export class Unit {
  id: string;
  name: string;
  color: string;
  image?: string;
  wordsCount?: number;
  words?: Array<any>;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}