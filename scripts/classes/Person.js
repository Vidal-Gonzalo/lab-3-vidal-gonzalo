export class Person {
  constructor(id, name, lastname, age) {
    if (!id) {
      throw new Error("ID is mandatory");
    }
    if (!name) {
      throw new Error("Name is mandatory");
    }
    if (!lastname) {
      throw new Error("Lastname is mandatory");
    }
    if (!age) {
      throw new Error("Age is mandatory");
    }
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.age = age;
  }
}
