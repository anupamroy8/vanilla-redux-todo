var inputbox = document.querySelector(".inputbox");
var ul = document.querySelector("ul");

var left = document.querySelector(".left");
var all = document.querySelector(".all");
var completed = document.querySelector(".completed");
var active = document.querySelector(".active");
var clear = document.querySelector(".clear");

var id = 12345;
var sst = [
  {
    text: "HTML",
    checked: true,
    id: 12356,
  },
  {
    text: "CSS",
    checked: true,
    id: 12359,
  },
  {
    text: "DOM",
    checked: false,
    id: 12366,
  },
];

function deleteTodo(e) {
  let id = e.target.parentElement.dataset.uid;
  sst = sst.filter((todo) => todo.id != id);
  createUI(sst);
}

function toggleTodo(e) {
  let id = e.target.parentElement.dataset.uid;
  sst = sst.map((todo) => {
    if (todo.id == id) {
      todo.checked = !todo.checked;
    }
    return todo;
  });
  createUI(sst);
}

function addTodo(e) {
  if (e.keyCode == 13) {
    console.log(e.target.value);
    var obj = {
      text: inputbox.value,
      checked: false,
      id: id++,
    };
    sst.push(obj);
    createUI(sst);
    inputbox.value = "";
  }
}

function itemsLeft() {
  let itemsLeft = sst.filter((t) => !t.checked);
  left.innerText = `${itemsLeft.length} items left`;
}

function completedTodo() {
  let completedTodo = sst.filter((todo) => todo.checked);
  createUI(completedTodo);
}

function activeTodo() {
  let activeTodo = sst.filter((todo) => !todo.checked);
  createUI(activeTodo);
}

function allTodo() {
  createUI(sst);
}

function clearTodo() {
  sst = sst.filter((todo) => !todo.checked);
  createUI(sst);
}

function createUI(todos = []) {
  console.log(todos);
  ul.innerHTML = "";

  todos.forEach((todo) => {
    var li = document.createElement("li");
    li.setAttribute("data-uid", todo.id);

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", toggleTodo);
    checkbox.checked = todo.checked;

    var p = document.createElement("p");
    p.innerText = todo.text;

    var span = document.createElement("span");
    span.innerText = "X";
    span.addEventListener("click", deleteTodo);
    li.append(checkbox, p, span);
    ul.append(li);
  });
  itemsLeft();
}

createUI(sst);

inputbox.addEventListener("keyup", addTodo);

completed.addEventListener("click", completedTodo);

active.addEventListener("click", activeTodo);

all.addEventListener("click", allTodo);

clear.addEventListener("click", clearTodo);
