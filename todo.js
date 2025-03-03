let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, completed: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="checkbox-${index}" ${item.completed ? "checked" : ""}>
        <p class="${item.completed ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
        <button class="delete-task" onclick="deleteTask(${index})">X</button>
      </div>
    `;

    li.querySelector(".todo-checkbox").addEventListener("change", () => toggleTask(index));
    todoList.appendChild(li);
  });
  todoCount.textContent = todo.length;
}

function editTask(index) {
  const taskText = todo[index].text;
  const newText = prompt("Edit your task:", taskText);
  if (newText !== null && newText.trim() !== "") {
    todo[index].text = newText.trim();
    saveToLocalStorage();
    displayTasks();
  }
}

function toggleTask(index) {
  todo[index].completed = !todo[index].completed;
  saveToLocalStorage();
  displayTasks();
}

function deleteTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todo = [];
    saveToLocalStorage();
    displayTasks();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
