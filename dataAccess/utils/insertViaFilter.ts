import { Knex } from 'knex';
import { filterValidColumns } from './filterValidColumns';
import { getTableColumns } from './getTableColumns';

type OptionsType = {
  tablename: string;
  schema?: string;
};

/**Filters out from data the columns that do not exist in the table defined by filterOptions, then inserts the valid data into the table using the provided transaction object. */
export async function insertViaFilter<T>(
  data: T,
  { tablename, schema = 'public' }: OptionsType,
  ctx: Knex.Transaction | Knex
) {
  const d = filterValidColumns(data, await getTableColumns(tablename, ctx, schema));
  return ctx([schema, tablename].join('.')).insert(d);
}

export async function updateViaFilter<T>(
  id: string,
  data: T,
  { tablename, schema = 'public' }: OptionsType,
  ctx: Knex.Transaction | Knex
) {
  const d = filterValidColumns(data, await getTableColumns(tablename, ctx, schema));
  return ctx([schema, tablename].join('.')).where({ id }).update(d);
}
