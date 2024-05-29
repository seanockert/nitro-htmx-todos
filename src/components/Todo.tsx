import { h } from 'nano-jsx';

export interface TodoProps {
  done: number;
  created: string;
  id: string;
  updated: string;
  value: string;
}

export const Todo = ({ id, value, done, updated }: TodoProps) => {
  return (
    <li className="inline fade-out" data-id={id} data-updated={updated} id={`todo-${id}`}>
      <label htmlFor={`done-${id}`} hidden>
        Mark as done
      </label>
      <input
        type="checkbox"
        id={`done-${id}`}
        name="done"
        hx-patch={`/todo/${id}`}
        checked={done === 1 ? true : undefined}
        value={id}
      />
      <label htmlFor={`value-${id}`} hidden>
        Value
      </label>
      <input id={`value-${id}`} name="value" value={value} hx-patch={`/todo/${id}`} />

      <button
        type="button"
        hx-delete={`/todo/${id}`}
        hx-swap="outerHTML swap:300ms"
        hx-target={`#todo-${id}`}
        hx-confirm="Delete?">
        <svg className="icon" viewBox="0 0 24 24">
          <title>Delete</title>
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
        </svg>
      </button>
      <a href={`/todo/${id}`} title="">
        <svg className="icon" viewBox="0 0 24 24">
          <title>View</title>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </li>
  );
};
