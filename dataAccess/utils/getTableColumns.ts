import { Knex } from 'knex';
import db from 'kotilogi-app/dbconfig';

export async function getTableColumns(
  tablename: string,
  dbConnection: typeof db | Knex.Transaction,
  schema: string = 'public'
) {
  const columns = await dbConnection(tablename).withSchema(schema).columnInfo();
  return Object.keys(columns);
}
