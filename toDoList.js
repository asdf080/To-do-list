const toDo = document.querySelector('#toDo-Form')
const toDoInput = document.querySelector("#toDo-Form input")
const toDoLi = document.querySelector("#todo-list")

let toDos = []

function saveToDos(){
  localStorage.setItem("todos",JSON.stringify(toDos))
}

function deleteToDo(e){
  const li = e.target.parentElement
    li.remove();
    toDos = toDos.filter((item) => item.id !== parseInt(li.id))
    saveToDos()
}

function paintToDo(newTodoObj){
  const li = document.createElement("li")
  li.setAttribute("id", newTodoObj.id)
  const span = document.createElement("span")
  const btn = document.createElement("button")

  btn.innerText = "✖"
  btn.addEventListener("click", deleteToDo)
  li.innerText = newTodoObj.text;
  li.appendChild(span)
  li.appendChild(btn)
  toDoLi.appendChild(li)
}

function handleToDoSubmit(event){
  event.preventDefault();
  // const newToDo = toDoInput.value
  const newTodoObj = {
    text: toDoInput.value,
    id: Date.now()
  }
  toDoInput.value = "";
  paintToDo(newTodoObj);

  toDos.push(newTodoObj)
  saveToDos();
}

toDo.addEventListener("submit", handleToDoSubmit)

const saved = localStorage.getItem("todos")
console.log(saved)

if(saved){
  toDos=JSON.parse(saved)
  toDos.forEach(paintToDo);
}