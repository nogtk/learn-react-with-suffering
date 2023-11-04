class TodoListModel {
  constructor() {
    this.idCounter = 0;
    this.todos = new Map();
  }

  addTodo(task) {
    this.idCounter += 1;
    this.todos.set(this.idCounter, {
      id: this.idCounter,
      task,
      checked: false,
    });
    return this.idCounter
  }

  getTodo(id) {
    return this.todos.get(id);
  }

  removeTodo(id) {
    return this.todos.delete(id);
  }

  checkTodo(id, isCheck) {
    const todo = this.todos.get(id);
    todo.checked = isCheck;
    return todo;
  }
}

class View {
  addTodo(todo) {
    const todosElement = document.getElementById('todos');
    const todoElement = this._createTodoElement(todo);
    todosElement.appendChild(todoElement);
  }

  check(id) {
    const todoElement = document.getElementById(`todo-${id}`);
    todoElement.className = 'checked';
  }

  unCheck(id) {
    const todoElement = document.getElementById(`todo-${id}`);
    todoElement.className = '';
  }

  removeTodo(id) {
    const todoElement = document.getElementById(`todo-${id}`);
    todoElement.remove();
  }

  resetTodo() {
    const input = document.getElementById('task-input');
    input.value = '';
  }

  _createTodoElement(todo) {
    const {id, task} = todo;
    const todoElement = document.createElement('li');
    todoElement.id = `todo-${id}`;
    const checkBoxElement = document.createElement('input');
    todoElement.appendChild(checkBoxElement);
    const labelElement = document.createElement('label');
    labelElement.innerText = task;
    checkBoxElement.type = 'checkbox';
    checkBoxElement.id = `checkbox-${id}`;
    todoElement.appendChild(labelElement);

    const buttonElement = document.createElement('button');
    buttonElement.innerText = 'Delete';
    buttonElement.id = `button-${id}`;
    todoElement.appendChild(buttonElement);

    return todoElement;
  }
}

const todoList = new TodoListModel();
const view = new View();

class Controller {
  setup() {
    this.handleSubmitForm();
  }

  handleSubmitForm() {
    const formElement = document.getElementById('task-send-form');
  formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('task-input');
      const task = input.value;
      if (!task.length > 0) {
        alert('Please enter a task');
        return;
      }

      const addedTodoId = todoList.addTodo(task);
      const todo = todoList.getTodo(addedTodoId);

      view.addTodo(todo);
      this.handleCheckTask(todo.id);
      this.handleClickDeleteTask(todo.id);
      view.resetTodo();
    });
  }

  handleCheckTask(id) {
    const checkBoxElement = document.getElementById(`checkbox-${id}`);
    checkBoxElement.onchange = function (e) {
      const checked = e.target.checked;
      const stateChangedTodo = todoList.checkTodo(id, checked);
      if (stateChangedTodo.checked) {
        view.check(stateChangedTodo.id);
      } else {
        view.unCheck(stateChangedTodo.id);
      }
    };
  }

  handleClickDeleteTask(id) {
    const buttonElement = document.getElementById(`button-${id}`);
    buttonElement.onclick = function () {
      view.removeTodo(id);
      todoList.removeTodo(id);
    };
  }
}

const formController = new Controller();
formController.setup();
