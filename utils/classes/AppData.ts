import { Knex } from 'knex';
import db from 'kotilogi-app/dbconfig';

export type AppDataType = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export abstract class AppData {
  private m_data: AppDataType;

  constructor(data: AppDataType) {
    this.m_data = data;
  }

  public get data() {
    return this.m_data;
  }

  public static async create(
    callback: (data: AppDataType, trx: Knex.Transaction) => Promise<void>,
    trx?: Knex.Transaction
  ) {
    const con = trx || (await db.transaction());

    try {
      const [data] = await con('data').insert({}, '*');
      await callback(data, con);
      await con.commit();
    } catch (err: any) {
      await con.rollback();
      throw err;
    }
  }
}
