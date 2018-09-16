
export class Word {
  wordNumber: number;
  polish: string;
  english: string[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}