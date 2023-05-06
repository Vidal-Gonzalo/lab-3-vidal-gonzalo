import { Person } from "./Person";

export class Villain extends Person {
  constructor(id, name, lastname, age, enemy, robberies, murders) {
    super(id, name, lastname, age);
    this.enemy = enemy;
    this.robberies = robberies;
    this.murders = murders;
  }
}
