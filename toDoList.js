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

// 이미지
const randImg = document.querySelector("#randImg")
const imgArr = ["1.jpg","2.jpg","3.jpg"]
const ran = imgArr[Math.floor(Math.random()*imgArr.length)]

const img = document.createElement("img")
img.setAttribute("src",`images/${ran}`)
randImg.appendChild(img)

// 시계
let clock = document.querySelector("#clock")
function getClock(){
  const date = new Date();
  let ho = date.getHours();
  let mi = date.getMinutes();
  let se = date.getSeconds();
  clock.innerHTML = `<i class="fa-regular fa-clock"></i>   ${String(ho).padStart(2,'0')} : ${String(mi).padStart(2,'0')} : ${String(se).padStart(2,'0')}`
}
getClock()
setInterval(getClock, 1000)