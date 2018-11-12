export class User {
  public id: number;
  public name: string;
  public email: string;
  public token = '';
  public role: string;
  public isAdmin: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  };
}
