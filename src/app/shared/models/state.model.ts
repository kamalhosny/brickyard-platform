export class State {
  public id: number;
  public name: string;
  public order: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  };
}
