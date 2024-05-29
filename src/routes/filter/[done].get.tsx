import { h, renderSSR } from 'nano-jsx';
import { TodoList, TodoProps } from '../../components/index.tsx';

export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const done = getRouterParam(event, 'done');

  try {
    if (done === 'all') {
      const { rows } = await db.sql<{ rows: TodoProps[] }>`SELECT * FROM todos ORDER BY created DESC`;
      return renderSSR(() => <TodoList todos={rows} />);
    } else {
      const { rows } = await db.sql<{ rows: TodoProps[] }>`SELECT * FROM todos WHERE done = ${
        done === 'true' ? 1 : 0
      } ORDER BY created DESC`;
      return renderSSR(() => <TodoList todos={rows} />);
    }
  } catch (err) {
    throw createError({
      status: 500,
      message: 'Failed'
    });
  }
});
