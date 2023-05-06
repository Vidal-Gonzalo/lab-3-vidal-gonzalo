import { Person } from "./Person";

export class Hero extends Person {
  constructor(id, name, lastname, age, alterEgo, city, published) {
    super(id, name, lastname, age);
    this.alterEgo = alterEgo;
    this.city = city;
    this.published = published;
  }
}
