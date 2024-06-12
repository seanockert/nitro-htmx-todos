import { h } from 'nano-jsx';
import { Todo } from './Todo.tsx';
import type { TodoProps } from './Todo.tsx';

export type TodoListInput = {
  todos: TodoProps[];
};

export const TodoList = (input: TodoListInput) => {
  return (
    <div>
      <script>document.title = "({input.todos.length}) Todo List";</script>
      {input.todos.length > 0 ? <ol className="stack">
        {input.todos.map((todo) => (
          <Todo {...todo} todosCount={input.todos.length} />
        ))}
      </ol> : <div><em>No todos</em></div>}
    </div>
  );
};
