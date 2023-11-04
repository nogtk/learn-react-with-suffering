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

  getTodos() {
    return Array.from(this.todos.values());
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
  render(todos) {
    const todosElement = document.getElementById('todos');
    todosElement.innerHTML = '';
    const fragment = document.createDocumentFragment();

    todos.forEach((todo) => {
      const todoElement = this._createTodoElement(todo);
      fragment.appendChild(todoElement);
    });
    todosElement.appendChild(fragment);
  }

  _createTodoElement(todo) {
    const {id, task, checked} = todo;
    const todoElement = document.createElement('li');
    todoElement.id = `todo-${id}`;
    const checkBoxElement = document.createElement('input');
    checkBoxElement.type = 'checkbox';
    checkBoxElement.id = `checkbox-${id}`;
    checkBoxElement.checked = checked;
    todoElement.appendChild(checkBoxElement);
    const labelElement = document.createElement('label');
    labelElement.innerText = task;
    todoElement.appendChild(labelElement);

    if (checked) {
      todoElement.className = 'checked';
    } else {
      todoElement.className = '';
    }

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

  flash() {
    const todos = todoList.getTodos();
    view.render(todos);

    todos.forEach((todo) => {
      const id = todo.id;
      this.handleCheckTask(id);
      this.handleClickDeleteTask(id);
    });
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

      todoList.addTodo(task);
      this.flash();
    });
  }

  handleCheckTask(id) {
    const checkBoxElement = document.getElementById(`checkbox-${id}`);
    checkBoxElement.addEventListener('change', (e) => {
      const checked = e.target.checked;
      todoList.checkTodo(id, checked);
      this.flash();
    });
  }

  handleClickDeleteTask(id) {
    const buttonElement = document.getElementById(`button-${id}`);
    buttonElement.addEventListener("click", () => {
      todoList.removeTodo(id);
      this.flash();
    });
  }
}

const formController = new Controller();
formController.setup();
