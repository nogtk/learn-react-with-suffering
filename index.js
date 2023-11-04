function handleFormSubmit() {
  const inputElement = document.getElementById('task-input');
  const inputValue = inputElement.value;

  if (!inputValue.length > 0) {
    alert('Please enter a task');
    return;
  }

  const todosElement = document.getElementById('todos');
  const todoElement = createTodoElement(inputValue);
  todosElement.appendChild(todoElement);

  inputElement.value = '';
}

function createTodoElement(task) {
  const todoElement = document.createElement('li');
  const checkBoxElement = document.createElement('input');
  checkBoxElement.type = 'checkbox';
  checkBoxElement.onchange = function (e) {
    const checked = e.target.checked;
    if (checked) {
      todoElement.className = `checked`;
    } else {
      todoElement.className = "";
    }
  };

  const labelElement = document.createElement('label'); 
  labelElement.innerText = task;

  const buttonElement = document.createElement('button');
  buttonElement.innerText = 'Delete';
  buttonElement.onclick = function () {
    todoElement.remove();
  };

  todoElement.appendChild(checkBoxElement);
  todoElement.appendChild(labelElement);
  todoElement.appendChild(buttonElement);

  return todoElement;
}
