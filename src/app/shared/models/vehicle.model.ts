import { State } from './state.model'

export class Vehicle {
  public id: number;
  public description: string;
  public currentState: State = new State();

  constructor(values: Object = {}) {
    Object.assign(this, values);
    this.currentState = new State(values["current_state"])
  };
}
