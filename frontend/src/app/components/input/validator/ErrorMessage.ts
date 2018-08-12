
export class ErrorMessage {
  type: string;
  message: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}