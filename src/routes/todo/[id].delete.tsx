export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const id = getRouterParam(event, 'id');

  try {
    await db.sql`DELETE FROM todos WHERE id = ${id}`;
    return '';
  } catch (err) {
    throw createError({
      status: 500,
      message: 'Cannot delete todo'
    });
  }
});
