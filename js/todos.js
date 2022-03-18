export default class Todo {
  #id;
  #title;
  #completed;

  constructor(id, title) {
    this.#id = id
    this.#title = title
    this.#completed = false
  }

  // Getters
  get id() {
    return this.#id
  }
  get title() {
    return this.#title
  }
  get completed() {
    return this.#completed
  }
  
  // Setters
  set title(newTitle) {
    this.#title = newTitle
  }

  set completed(newStatus) {
    this.#completed = newStatus 
  }
}
