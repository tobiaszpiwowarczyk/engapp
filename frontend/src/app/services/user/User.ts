
export class User {
  id: string;
  lp: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}