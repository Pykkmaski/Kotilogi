import { Knex } from 'knex';
import { DatabaseTable } from './databaseTable';

class Bills {
  async addBill(bill: TODO, trx?: Knex.Transaction) {
    return await new DatabaseTable('bills', trx).add(bill);
  }
}

export const bills = new Bills();
