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
document.querySelector("#logout-btn").addEventListener('click', logOut);

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
        if(foundUser){
           toogleToDoList(true)
        }
    } catch (err) {
        console.log(err);
    }

}


function logOut(){
    toogleToDoList(false)
}

function toogleToDoList(showTodoList){
     document.querySelector(".main").style.display = showTodoList ? "none" :"block";
     document.querySelector(".main-user-logged").style.display = showTodoList ? "block" :"none";
     
   /*  if(showTodoList){
        document.querySelector(".main").style.display="none"
            document.querySelector(".main-user-logged").style.display="block"
        }else{
             document.querySelector(".main").style.display="block"
             document.querySelector(".main-user-logged").style.display="none"
        } */
    }







