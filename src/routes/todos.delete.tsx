import { h, renderSSR } from 'nano-jsx';
import { TodoList } from '../components/index.tsx';
import type { TodoProps } from '../components/index.tsx';

export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const doneValues = event._path.match(/done=([^&]+)/g);
  const ids = doneValues.map((done) => done.split('=')[1]);
  const placeholders = ids.map(() => '?').join(', ');
  const query = `DELETE FROM todos WHERE id IN (${placeholders})`;

  try {
    const stmt = db.prepare(query);
    await stmt.run(...ids);

    const { rows } = await db.sql<{ rows: TodoProps[] }>`SELECT * FROM todos ORDER BY updated DESC`;
    return renderSSR(() => <TodoList todos={rows} />);
  } catch (err) {
    throw createError({
      status: 500,
      message: 'Cannot delete todo'
    });
  }
});
