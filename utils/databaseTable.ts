import { Knex } from 'knex';
import db from 'kotilogi-app/dbconfig';

export class DatabaseTable {
  protected tablename: string;
  protected connection: Knex.Transaction | typeof db;

  constructor(tablename: string, trx?: Knex.Transaction) {
    this.tablename = tablename;
    this.connection = trx || db;
  }

  pluck(columnName: string, query: TODO) {
    return this.connection(this.tablename).where(query).pluck(columnName);
  }

  select(columnNames: string | string[], query: TODO) {
    return this.connection(this.tablename).where(query).select(columnNames);
  }

  get(query: TODO) {
    return this.connection(this.tablename).where(query);
  }

  async add<T>(data: T, returns?: string | string[]) {
    try {
      return this.connection(this.tablename).insert(data, returns);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  update<T>(data: T, query: TODO, returns?: string | string[]) {
    return this.connection(this.tablename).where(query).update(data, returns);
  }

  del(query: TODO) {
    return this.connection(this.tablename).where(query).del();
  }

  async count(query: TODO) {
    const [{ count }] = await this.connection(this.tablename)
      .where(query)
      .count('*', { as: 'count' });
    return count as number;
  }
}
