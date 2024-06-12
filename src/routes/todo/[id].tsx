import { h, renderSSR } from 'nano-jsx';
import { Base, TodoProps } from '../../components/index.tsx';

export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const id = getRouterParam(event, 'id');

  const { rows } = await db.sql<{ rows: TodoProps[] }>`SELECT * FROM todos WHERE id = ${id} LIMIT 1`;
  const todo = rows[0];

  if (!todo) {
    throw createError({
      status: 404,
      message: `No item found with ID: ${id}`
    });
  }

  return renderSSR(() => (
    <Base>
      <main class="stack" id={`todo-${todo.id}`}>
        <h2>
          {todo.value} ({todo.id})
        </h2>
        <div>Done: {todo.done === 1 ? 'Yes' : 'No'}</div>
        <div>Created: {todo.created}</div>
        <div>Updated: {todo.updated}</div>

        <button
          type="button"
          hx-delete={`/todo/${todo.id}?redirect=true`}
          hx-swap="outerHTML swap:0.15s"
          hx-target={`#todo-${todo.id}`}
          hx-confirm="Delete?">
          Delete
        </button>
        <a href="/" title="">
          Back
        </a>
      </main>
    </Base>
  ));
});
