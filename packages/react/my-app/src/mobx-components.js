import { makeObservable, observable, action, computed, autorun } from "mobx";
import { observer } from "mobx-react-lite"

export class Todo {
  id = Math.random();
  title = "";
  finished = false;

  constructor(title) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action
    })
    this.title = title
  }

  toggle() {
    this.finished = !this.finished
  }
}

export class TodoList {
  todos = []
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length
  }
  constructor(todos) {
    makeObservable(this, {
      todos: observable,
      unfinishedTodoCount: computed
    });
    this.todos = todos;
  }
}

export const TodoListView = observer(({ todoList }) => (
  <div>
    <ul>
      {todoList.todos.map(todo => (
        <TodoView todo={todo} key={todo.id} />
      ))}
    </ul>
    Tasks left: {todoList.unfinishedTodoCount}
  </div>
))

export const TodoView = observer(({ todo }) => (
  <li>
    <input type="checkbox" defaultChecked={todo.finished} onClick={() => todo.toggle()} />
    {todo.title}
  </li>
))