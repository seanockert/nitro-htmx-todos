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
  const title = `(${rows.filter(row => row.done).length}/${rows.length}) Todo List`;

  return renderSSR(() => (
    <Base>
      <main class="stack-2x">
        <header class="stack">
          <h1>Todo List</h1>
          <form
            class="inline card"
            hx-disabled-elt="input[type='text'], button"
            hx-on--after-request="document.getElementById('todo').value = '';document.getElementById('todo').focus()"
            hx-post="/todos"
            hx-target-500="#add-error"
            hx-target="#todo-list"
          >
            <label for="todo" hidden>
              Add a todo
            </label>
            <input
              autofocus
              hx-validate="true"
              id="todo"
              maxLength="100"
              minLength="1"
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
              className="button-link"
              hx-disabled-elt="button"
              hx-get="/filter/true"
              hx-on--after-request="console.log('updated')"
              hx-target="#todo-list"
            >
              Done
            </button>
            <button 
              className="button-link"
              hx-disabled-elt="button" 
              hx-get="/filter/false" 
              hx-target="#todo-list" 
            >
              Not done
            </button>
            <button 
              className="button-link"
              hx-disabled-elt="button" 
              hx-get="/filter/all" 
              hx-target="#todo-list" 
            >
              All
            </button>
          </div>
          <div class="inline">
            Sort:
            <button 
              className="button-link"
              hx-disabled-elt="button" 
              hx-get="/filter/sort/asc" 
              hx-target="#todo-list" 
            >
              Old to New
            </button>
            <button 
              className="button-link"
              hx-disabled-elt="button" 
              hx-get="/filter/sort/desc" 
              hx-target="#todo-list" 
            >
              New to Old
            </button>
          </div>
        </div>

        <section id="todo-list">
          <TodoList todos={rows} />
        </section>

        <div>
          <button
            hx-confirm="Delete all done todos?"
            hx-delete="/todos"
            hx-disabled-elt="button"
            hx-include="[name='done']:checked"
            hx-target="#todo-list"
          >
            Delete all done
          </button>
        </div>
      </main>
    </Base>
  ));
});
