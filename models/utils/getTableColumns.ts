import { Knex } from 'knex';
import db from 'kotilogi-app/dbconfig';

export async function getTableColumns(
  tablename: string,
  dbConnection: typeof db | Knex.Transaction
) {
  const columns = await dbConnection(tablename).columnInfo();
  return Object.keys(columns);
}
