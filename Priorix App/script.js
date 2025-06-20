class TaskQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(task) {
    this.queue.push(task);
  }

  dequeue() {
    return this.queue.shift();
  }

  editTask(index, updatedTask) {
    if (index >= 0 && index < this.queue.length) {
      this.queue[index] = updatedTask;
    }
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  getTasks() {
    return this.queue;
  }
}

const taskQueue = new TaskQueue();
const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const removeTaskButton = document.getElementById("remove-task");
const tasksList = document.getElementById("tasks");
const splash = document.getElementById("splash");
const mainApp = document.getElementById("main-app");
let editIndex = null;

window.addEventListener("load", () => {
  setTimeout(() => {
    splash.classList.add("hidden");
    mainApp.classList.remove("hidden");
  }, 3000);
});

addTaskButton.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  const priority = priorityInput.value;
  const deadline = deadlineInput.value;

  if (!taskName || !priority || !deadline) {
    alert("Please fill out all fields!");
    return;
  }

  const task = { name: taskName, priority, deadline };

  if (editIndex !== null) {
    taskQueue.editTask(editIndex, task);
    editIndex = null;
    addTaskButton.textContent = "Add Task";
  } else {
    taskQueue.enqueue(task);
  }

  renderTasks();
  taskInput.value = "";
  priorityInput.value = "";
  deadlineInput.value = "";
});

removeTaskButton.addEventListener("click", () => {
  if (taskQueue.isEmpty()) {
    alert("No tasks to remove!");
    return;
  }

  const removedTask = taskQueue.dequeue();
  renderTasks();
  alert(`Removed: ${removedTask.name}`);
});

function renderTasks() {
  tasksList.innerHTML = "";
  const tasks = taskQueue.getTasks();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${task.name} (Priority: ${task.priority}, Deadline: ${task.deadline})`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      taskInput.value = task.name;
      priorityInput.value = task.priority;
      deadlineInput.value = task.deadline;
      editIndex = index;
      addTaskButton.textContent = "Update Task";
    };

    li.appendChild(editBtn);
    tasksList.appendChild(li);
  });
}
