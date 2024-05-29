import { h, renderSSR } from 'nano-jsx';
import { TodoList, TodoProps } from '../../../components/index.tsx';

export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const order = getRouterParam(event, 'order');

  try {
    const response =
      order === 'asc'
        ? await db.sql<{ rows: TodoProps[] }>`SELECT * FROM todos ORDER BY created ASC`
        : await db.sql<{ rows: TodoProps[] }>`SELECT * FROM todos ORDER BY created DESC`;
    return renderSSR(() => <TodoList todos={response.rows} />);
  } catch (err) {
    throw createError({
      status: 500,
      message: 'Failed'
    });
  }
});
