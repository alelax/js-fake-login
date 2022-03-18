export class Todo {
  #id;
  #title;

  constructor(id, title) {
    this.#id = id;
    this.#title = title;
  }

  get id() {
    return this.#id;
  }
 

  get title() {
    return this.#title;
  }
}
