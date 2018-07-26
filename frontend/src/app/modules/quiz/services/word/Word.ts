
export class Word {
  wordNumber: number;
  polish: string;
  english: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}