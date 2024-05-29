import { z } from 'zod';
import { h, renderSSR } from 'nano-jsx';
import { customAlphabet } from 'nanoid';
import { TodoList } from '../components/index.tsx';
import type { TodoProps } from '../components/index.tsx';

const todoCreateSchema = z.object({
  todo: z.string().min(1).max(100)
});

const nanoid = customAlphabet('1234567890abcdef', 10);

export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const body = await readBody(event);

  try {
    const parsed = todoCreateSchema.parse(body);
    await db.sql`INSERT INTO todos VALUES (${nanoid()}, ${parsed.todo}, 0, datetime(), datetime())`;
    const { rows } = await db.sql<{ rows: TodoProps[] }>`SELECT * FROM todos ORDER BY updated DESC`;
    return renderSSR(() => <TodoList todos={rows} />);
  } catch (e) {
    console.log('error', e);
    throw createError({
      status: 500,
      message: renderSSR(() => <div>Invalid input, todos must be less than 100 characters</div>)
    });
  }
});
