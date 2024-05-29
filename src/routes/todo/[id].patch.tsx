export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);

  try {
    if (body.value) {
      await db.sql`UPDATE todos SET value = ${body.value}, updated = datetime() WHERE id = ${id}`;
    } else {
      await db.sql`UPDATE todos SET done = ${body.done === 'on' ? 1 : 0}, updated = datetime() WHERE id = ${id}`;
    }
    return { message: 'Todo item updated' };
  } catch (err) {
    throw createError({
      status: 500,
      message: `Failed to update todo with ID: ${id}`
    });
  }
});
