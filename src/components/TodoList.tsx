import { h } from 'nano-jsx';
import { Todo } from './Todo.tsx';
import type { TodoProps } from './Todo.tsx';

export type TodoListInput = {
  todos: TodoProps[];
};

export const TodoList = (input: TodoListInput) => {
  return (
    <ol className="stack">
      {input.todos.map((todo) => (
        <Todo {...todo} />
      ))}
    </ol>
  );
};
