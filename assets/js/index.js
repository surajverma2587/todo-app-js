// const viewAllBtn = document.getElementById("view-all-btn");
const viewAllBtn = $("#view-all-btn");
const viewCompletedBtn = $("#view-completed-btn");
const todoForm = $("#todo-form");

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
};

// viewAllBtn.addEventListener("click", handleViewAllBtnClick);
viewAllBtn.click(handleViewAllBtnClick);
viewCompletedBtn.click(handleViewCompletedBtnClick);
todoForm.submit(handleFormSubmit);
