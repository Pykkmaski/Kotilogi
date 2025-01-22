import db from 'kotilogi-app/dbconfig';
import { LockDataType } from './types';
import { Knex } from 'knex';

class Locks {
  /**Saves lock data associated with an event. */
  async create(eventId: string, lockData: LockDataType[], ctx: Knex | Knex.Transaction) {
    const promises = lockData.map(async l => ctx('lock').insert({ ...l, event_id: eventId }));
    await Promise.all(promises);
  }

  /**Returns the lock-data associated with a lock restoration event. */
  async get(eventId: string) {
    return await db('lock')
      .join(db.raw('types.lock_type on types.lock_type.id = lock.lock_type_id'))
      .where({ 'lock.event_id': eventId })
      .select('lock.*', 'types.lock_type.label as lock_type_label');
  }
}

export const locks = new Locks();
