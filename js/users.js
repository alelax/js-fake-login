export default class User {
  #id;
  #name;
  #username;
  #email;
  #phone;
  #password = '1234pw'

  constructor(id, fullname, usrname, emailAddress, telephone) {
    this.#id = id
    this.#name = fullname
    this.#username = usrname
    this.#email = emailAddress
    this.#phone = telephone
  }

  // Getters
  get id() {
    return this.#id
  }
  get username() {
    return this.#username
  }
  get email() {
    return this.#email
  }
  get password() {
    return this.#password
  }

  // Setters
  set name(newName) {
    this.#name = newName
  }

  set username(newUsername) {
    if (this.#username === newUsername) {
      console.log('Il nuovo username deve essere diverso da quello precedente');
    } else {
      this.#username = newUsername
    }
    
  }

  set email(newEmail) {
    this.#email = newEmail
  }
}
