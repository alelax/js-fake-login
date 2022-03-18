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
import {Todo} from "./todo.js";

document.querySelector('#login-btn').addEventListener('click', login);
document.querySelector("#logout-btn").addEventListener('click', logOut);

let result = document.cookie.includes("username")
if(result) {
    toogleView(true)
    fetchTodos()
}

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
           fetchTodos() 
           document.cookie = `username=${foundUser.username}`
           toogleView(true)
        }
    } catch (err) {
        console.log(err);
    }
}


function logOut(){
    toogleView(false)
    document.cookie = "username" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function toogleView(showTodoList){
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

async function fetchTodos() {
    const todoResponse = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await todoResponse.json()
    const fetchedTodos = todos.map(todo => new Todo(todo.id, todo.title)).slice(0, 20)
    buildHtmlTodo(fetchedTodos)
}

function buildHtmlTodo(todos) {
    let todoListContainer = document.querySelector(".main-user-logged")
    for(const el of todos) {
        console.log(el)
         let todoItemContainer = document.createElement("div")
         todoItemContainer.className = "todo-item"
         let todoItemBody = document.createElement("p")
         todoItemBody.textContent = el.title
         let todoItemLink = document.createElement("a")
         todoItemLink.setAttribute("id", el.id)
         todoItemLink.className = "delete-btn"
         todoItemLink.setAttribute("align", "center")
         todoItemLink.textContent = "Completato"
         todoItemContainer.appendChild(todoItemBody)
         todoItemContainer.appendChild(todoItemLink)
         todoListContainer.appendChild(todoItemContainer)
    }
}









