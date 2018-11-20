
export class Word {
  wordNumber: number;
  polish: string;
  english: string[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export interface WordCreationEntity {
  unitId: string;
  polish?: string;
  english?: string[];
}

export interface WordEditionEntity {
  unitId: string;
  wordNumber: number;
  polish?: string;
  english?: string[];
}