export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const id = getRouterParam(event, 'id');
  const query = getQuery(event);

  try {
    await db.sql`DELETE FROM todos WHERE id = ${id}`;
    return query.redirect ? new Response(null, {
      status: 204,
      headers: {
        'HX-Redirect': '/',
      },
    })  : '';
  } catch (err) {
    throw createError({
      status: 500,
      message: 'Cannot delete todo'
    });
  }
});
