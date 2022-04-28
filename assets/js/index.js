// const viewAllBtn = document.getElementById("view-all-btn");
const viewAllBtn = $("#view-all-btn");
const viewCompletedBtn = $("#view-completed-btn");
const todoForm = $("#todo-form");
const todosSection = $("#todos-section");

const readFromLocalStorage = (key, defaultValue) => {
  // get from LS using key name
  const dataFromLS = localStorage.getItem(key);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

const renderTodos = (todos) => {
  // empty todos section
  todosSection.empty();

  // render all todos here
  console.log(todos);

  // for each todo in todos render todo card

  for (let i = 0; i < todos.length; i += 1) {
    // get current todo
    const todo = todos[i];

    // construct the todo card
    const todoCard = `<div class="card my-2" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">${todo.task}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${todo.dueDate}</h6>
      </div>
      <div class="card-footer">
        <div class="d-grid gap-2">
          <button class="btn btn-warning" type="button" name="complete-btn" data-uuid=${todo.id}>${todo.status}</button>
          <button class="btn btn-danger" type="button" name="delete-btn" data-uuid=${todo.id}>Delete</button>
        </div>
      </div>
    </div>`;

    // append the card to todosSection
    todosSection.append(todoCard);
  }
};

const renderAlert = (message) => {
  // construct the alert banner
  const alertBanner = `<div class="alert alert-warning text-center" id="alert">
  ${message}
</div>`;
  // append banner to todosSection
  todosSection.append(alertBanner);
};

const handleViewAllBtnClick = () => {
  console.log("view all clicked");
};

const handleViewCompletedBtnClick = () => {
  console.log("view completed clicked");
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  console.log("form submitted");

  // get form inputs
  // const task = document.getElementById("todo-task-input").value
  const task = $("#todo-task-input").val();
  const dueDate = $("#due-date-input").val();

  const todo = {
    task,
    dueDate,
    status: "Pending",
    id: uuid.v4(),
  };

  console.log(todo);

  // store in LS
  // get from LS
  const todos = readFromLocalStorage("todos", []);

  // push to array
  todos.push(todo);

  // write to LS
  writeToLocalStorage("todos", todos);

  // clear form inputs
  $("#todo-task-input").val("");
  $("#due-date-input").val("");

  renderTodos(todos);
};

const handleTodoAction = (event) => {
  // get target
  const target = $(event.target);

  // target.tagName === 'LI'
  if (target.is('button[name="complete-btn"]')) {
    console.log("complete clicked");
  }

  if (target.is('button[name="delete-btn"]')) {
    // get todo id clicked on
    const uuid = target.attr("data-uuid");
    console.log(uuid);
    // get all todos
    const todos = readFromLocalStorage("todos", []);

    const removeTodo = (todo) => {
      return todo.id !== uuid;
    };

    // filter todos to remove the todo you want to delete
    const filteredTodos = todos.filter(removeTodo);

    if (filteredTodos.length !== 0) {
      // render todos
      renderTodos(filteredTodos);
    } else {
      // empty todos section
      todosSection.empty();
      renderAlert("You have no tasks to do!!");
    }

    // update LS with filtered todos
    writeToLocalStorage("todos", filteredTodos);
  }
};

const handleLoad = () => {
  // get all todos from LS
  const todos = readFromLocalStorage("todos", []);

  if (todos.length !== 0) {
    // render the todos
    renderTodos(todos);
  } else {
    // render alert banner
    renderAlert("You have no tasks to do!!");
  }
};

// viewAllBtn.addEventListener("click", handleViewAllBtnClick);
viewAllBtn.click(handleViewAllBtnClick);
viewCompletedBtn.click(handleViewCompletedBtnClick);
todoForm.submit(handleFormSubmit);
todosSection.click(handleTodoAction);

// on load of document
// window.addEventListener("load", handleLoad);
$(document).ready(handleLoad);
