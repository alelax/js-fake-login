

export class User {
    #id;
    #name;
    #username;
    #email;
    #password = "PippoBaudo";

    constructor(id, name, username, email) {
        this.#id = id;
        this.#name = name;
        this.#username = username;
        this.#email = email;
    }

    get username() {
        return this.#username;
    }
    set username(nuovoUsername) {
        this.#username = nuovoUsername;
    }

    get password () {
        return this.#password;
    }

}