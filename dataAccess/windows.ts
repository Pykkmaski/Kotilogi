import db from 'kotilogi-app/dbconfig';
import { WindowDataType } from './types';
import { Knex } from 'knex';

class Windows {
  /**Saves an array of windows for an event. */
  async create(eventId: string, windows: WindowDataType[], ctx: Knex | Knex.Transaction) {
    const promises = windows.map(w => ctx('window').insert({ ...w, event_id: eventId }));
    await Promise.all(promises);
  }

  /**Returns the window-data associated with an event. */
  async get(eventId: string) {
    return db('window').where({ event_id: eventId });
  }

  /**Returns the data associated with window service events. */
  async getServiceData(eventId: string) {
    const [data] = await db('service_events.window_service_event as ese')
      .join(
        db.raw('service_events.window_service_type as est on est.id = ese.service_work_type_id')
      )
      .where({ 'ese.event_id': eventId })
      .select('est.label as service_work_type_label');
    return data;
  }
}

export const windows = new Windows();
