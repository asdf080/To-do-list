const toDo = document.querySelector('#toDo-Form')
const toDoInput = document.querySelector("#toDo-Form input")
const toDoLi = document.querySelector("#todo-list")

let toDos = []

function saveToDos(){
  localStorage.setItem("todos",JSON.stringify(toDos))
}

function paintToDo(ntd){
  const li = document.createElement("li")
  const span = document.createElement("span")
  const btn = document.createElement("button")

  btn.innerText = "✖"
  btn.addEventListener("click", e => e.target.parentElement.remove())
  li.innerText = ntd;
  li.appendChild(span)
  li.appendChild(btn)
  toDoLi.appendChild(li)
}

function handleToDoSubmit(event){
  event.preventDefault();
  const newToDo = toDoInput.value
  toDoInput.value = "";
  paintToDo(newToDo);

  toDos.push(newToDo)
  saveToDos();
}

toDo.addEventListener("submit", handleToDoSubmit)

const saved = localStorage.getItem("todos")
console.log(saved)

if(saved){
  toDos=JSON.parse(saved)
  toDos.forEach(paintToDo);
}