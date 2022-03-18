
import User from "./users.js"
import Todo from "./todos.js"



document.querySelector('#login-btn').addEventListener('click', login);
document.querySelector('#logout-btn').addEventListener('click', logout);
let fetchedTodos


if (checkCookie('username') !== -1) {
  toggleTodo(true)
  fetchTodosList()
} else {
  toggleTodo(false)
}



async function login() {
  const uname = document.getElementById('form-username').value;
  const pass = document.getElementById('form-password').value;

  if (!uname || !pass) {
    alert('DEVI INSERIRE USERNAME E PASSWORD')
    throw new Error("DEVI INSERIRE USERNAME E PASSWORD");
  } 

  try {
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const fetchedUsers = users.map( u => new User(u.id, u.name, u.username, u.email, u.phone))
  
    
    const foundUser = fetchedUsers.find( fu => fu.username === uname && fu.password === pass)
    
    // Set cookie and grant access
    if (foundUser) {
      document.cookie = `username=${foundUser.username};`;
      fetchTodosList()
      toggleTodo(true)
    } else {
      alert("L' UTENTE NON ESISTE")
      throw new Error("L' UTENTE NON ESISTE");
    }


  } catch (error) {
    console.warn('Something went wrong.', error);
  } 
  
  
}

async function fetchTodosList() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();
  
  fetchedTodos = todos.map( t => new Todo(t.id, t.title)).slice(0, 20)
  
  for (const todo of fetchedTodos) {
    buildTodoHtmlElement(todo)  
  }
  
}

async function deleteItem() {
  const todoIdToDelete = this.getAttribute('id')
  await fetch(`https://jsonplaceholder.typicode.com/todos/${todoIdToDelete}`, {
    method: 'DELETE'
  });

  const el = this
  const container = el.parentNode
  container.remove()

  fetchedTodos = fetchedTodos.filter( todo => todo.id !== +todoIdToDelete )
}

function buildTodoHtmlElement(todo) {
  const todoListContainer = document.querySelector('.main-user-logged')
      
  const todoItemContainer = document.createElement("div");
  todoItemContainer.className = 'todo-item'
  
  const todoItemText = document.createElement("p");
  todoItemText.textContent = todo.title;
  
  const todoItemDeleteButton = document.createElement("a");
  todoItemDeleteButton.className = 'delete-btn'
  todoItemDeleteButton.setAttribute('align', 'center');
  todoItemDeleteButton.setAttribute('id', todo.id);
  todoItemDeleteButton.addEventListener('click', deleteItem);
  todoItemDeleteButton.textContent = 'completato'

  todoItemContainer.appendChild(todoItemText);
  todoItemContainer.appendChild(todoItemDeleteButton);

  todoListContainer.appendChild(todoItemContainer)
}


function toggleTodo(showToDoList) {
  document.querySelector('.main').style.display = showToDoList ? 'none' : 'block'
  document.querySelector('.main-user-logged').style.display = showToDoList ? 'block' : 'none'
}


function checkCookie(name) {
  const prefix = `${name}=`
  const cookie = document.cookie.indexOf(prefix);
  return cookie
}


function logout() {
  document.cookie = "username" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  toggleTodo(false)
}