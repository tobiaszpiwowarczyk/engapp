
export class DropFile {
  name: string;
  type: string;
  data: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}