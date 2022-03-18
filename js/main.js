//variabili da utilizzare
//chiamata all API per return utenti
//Comparazione (if)
//Simualzione cambio page / messaggio di errore 
//definire classe utente
/*"id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",*/

import  {User}  from "./user.js";

document.querySelector('#login-btn').addEventListener('click', login);

async function login() {
    const formUserName = document.getElementById('form-username').value;
    const formUserPassword = document.getElementById('form-password').value;
    if(!formUserName || !formUserPassword) {
        alert('Errore inserisci credenziali!');
        throw new Error('Errore inserisci credenziali!');
    }
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        const fetchedUsers = users.map(user => new User(user.id, user.name, user.username, user.email));
        const foundUser = fetchedUsers.find(user => user.username === formUserName && user.password === formUserPassword);
        console.log(foundUser);
    } catch (err) {
        console.log(err);
    }
}





