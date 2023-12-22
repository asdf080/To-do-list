const toDo = document.querySelector("#toDo-Form");
const toDoInput = document.querySelector("#toDo-Form input");
const toDoLi = document.querySelector("#todo-list");

let toDos = [];

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(e) {
  const li = e.target.parentElement;
  li.remove();
  toDos = toDos.filter(
    (item) => item.text !== li.querySelector("span").innerText
  );
  saveToDos();
}

function paintToDo(newTodoObj) {
  const li = document.createElement("li");
  li.setAttribute("id", newTodoObj.id);
  li.setAttribute("draggable", "true");
  const span = document.createElement("span");
  const btn = document.createElement("button");

  btn.innerText = "✖";
  btn.addEventListener("click", deleteToDo);
  span.innerText = newTodoObj.text;
  li.appendChild(span);
  li.appendChild(btn);
  toDoLi.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodoObj = {
    text: toDoInput.value,
    id: Date.now(),
  };
  toDoInput.value = "";
  paintToDo(newTodoObj);

  toDos.push(newTodoObj);
  saveToDos();
}

toDo.addEventListener("submit", handleToDoSubmit);

const saved = localStorage.getItem("todos");

if (saved) {
  toDos = JSON.parse(saved);
  toDos.forEach(paintToDo);
}

// 드래그
const ul = document.querySelector("ul");
const lists = ul.querySelectorAll("li:not(.dragging)");

lists.forEach((list) => {
  list.addEventListener("dragstart", () => {
    setTimeout(() => list.classList.add("dragging"), 0);
  });

  list.addEventListener("dragend", () => {
    list.classList.remove("dragging");
  });
});

const initSortableList = (e) => {
  e.preventDefault();
  const draggingItem = ul.querySelector(".dragging");
  const siblings = [...ul.querySelectorAll("li:not(.dragging)")];

  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  ul.insertBefore(draggingItem, nextSibling);
};

ul.addEventListener("dragover", initSortableList);
ul.addEventListener("dragenter", (e) => e.preventDefault());
ul.addEventListener("drop", () => {
  const newUl = document.querySelectorAll("li");
  reArray(newUl);
});

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function reArray(obj) {
  toDos = [];
  obj.forEach((item) => {
    const text = item.querySelector("span");
    const newTodoObj = {
      text: text.innerText,
      id: item.id,
    };
    toDos.push(newTodoObj);
    saveToDos();
  });
}

// 이미지
const randImg = document.querySelector("#randImg");
const imgArr = ["1.jpg", "2.jpg", "3.jpg"];
const ran = imgArr[Math.floor(Math.random() * imgArr.length)];

const img = document.createElement("img");
img.setAttribute("src", `images/${ran}`);
randImg.appendChild(img);

// 시계
let clock = document.querySelector("#clock");
function getClock() {
  const date = new Date();
  let ho = date.getHours();
  let mi = date.getMinutes();
  let se = date.getSeconds();
  clock.innerHTML = `<i class="fa-regular fa-clock"></i>   ${String(
    ho
  ).padStart(2, "0")} : ${String(mi).padStart(2, "0")} : ${String(se).padStart(
    2,
    "0"
  )}`;
}
getClock();
setInterval(getClock, 1000);
