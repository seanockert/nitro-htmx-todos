import { h, renderSSR } from 'nano-jsx';
import { Base, TodoList, TodoProps } from '../components/index.tsx';

export default defineEventHandler(async () => {
  const db = useDatabase();

  // Create todos table
  //await db.sql`DROP TABLE IF EXISTS todos`;
  await db.sql`CREATE TABLE IF NOT EXISTS todos (
    "id" TEXT PRIMARY KEY, 
    "value" TEXT, 
    "done" INTEGER, 
    "created" TEXT, 
    "updated" TEXT
  )`;

  const { rows } = await db.sql<{ rows: TodoProps[] }>`SELECT * FROM todos ORDER BY created DESC`;

  return renderSSR(() => (
    <Base>
      <main class="stack-2x">
        <header class="stack">
          <h1>Todos</h1>
          <form
            hx-post="/todos"
            hx-target="#todo-list"
            hx-disabled-elt="input[type='text'], button"
            hx-target-500="#add-error"
            class="inline card">
            <label for="todo" hidden>
              Add a todo
            </label>
            <input
              autofocus
              hx-validate="true"
              id="todo"
              minLength="1"
              maxLength="100"
              name="todo"
              placeholder="Add a todo..."
              required
              type="text"
            />
            <button type="submit">Add</button>
          </form>
          <div id="add-error"></div>
        </header>

        <div class="inline-between">
          <div class="inline">
            Filter:
            <button
              className="fade-out"
              hx-get="/filter/true"
              hx-target="#todo-list"
              hx-disabled-elt="button"
              hx-on--after-request="console.log('updated')">
              Done
            </button>
            <button hx-get="/filter/false" hx-target="#todo-list" hx-disabled-elt="button">
              Not done
            </button>
            <button hx-get="/filter/all" hx-target="#todo-list" hx-disabled-elt="button">
              All
            </button>
          </div>
          <div class="inline">
            Sort:
            <button hx-get="/filter/done/sort/asc" hx-target="#todo-list" hx-disabled-elt="button">
              Old to New
            </button>
            <button hx-get="/filter/all/sort/desc" hx-target="#todo-list" hx-disabled-elt="button">
              New to Old
            </button>
          </div>
        </div>

        <section
          id="todo-list"
          class="stack-2x"
          hx-on--after-settle="document.getElementById('todo').value = '';document.getElementById('todo').focus()">
          <TodoList todos={rows} />
        </section>

        <div>
          <button
            hx-delete="/todos"
            hx-include="[name='done']:checked"
            hx-target="#todo-list"
            hx-confirm="Delete all done todos?"
            hx-disabled-elt="button">
            Delete all done
          </button>
        </div>
      </main>
    </Base>
  ));
});
