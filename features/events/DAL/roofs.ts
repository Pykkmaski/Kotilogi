import { Knex } from 'knex';
import { filterValidColumns } from '../../../dataAccess/utils/filterValidColumns';
import { getTableColumns } from '../../../dataAccess/utils/getTableColumns';
import db from 'kotilogi-app/dbconfig';
import { roofSchema } from '../schemas/roofSchema';
import { events } from './events';
import { RoofDataType } from '../types/RoofDataType';
import { BuildingDataType } from 'kotilogi-app/features/properties/types/BuildingDataType';

class Roofs {
  async getTypes(ctx: Knex | Knex.Transaction) {
    return await ctx('types.roof_type').select(db.raw('json_object_agg(name, id) as result'));
  }

  async get(property_id: string, ctx: Knex | Knex.Transaction) {
    const roof = await ctx('new_events')
      .where(
        db.raw("(event_type = 'Genesis' OR event_type = 'Peruskorjaus') AND target_type = 'Katto'")
      )
      .andWhere({ property_id })
      .orderBy('date', 'desc', 'last')
      .select('data')
      .first();

    return roof?.data;
  }

  /**
   * Creates a genesis event for a roof.
   */
  async create(property_id: string, payload: Partial<RoofDataType>, trx: Knex.Transaction) {
    const roof = roofSchema.parse(payload);
    await events.create(
      {
        property_id,
        event_type: 'Genesis',
        target_type: 'Katto',
        description: 'Katon tietojen lisäys.',
        date: new Date(),
        data: roof,
      } as any,
      trx
    );
  }

  /**
   * @deprecated Should become part of updating a roof restoration event.
   * @param property_id
   * @param payload
   * @param trx
   * @returns
   */
  async update(property_id: string, payload: Partial<BuildingDataType>, trx: Knex.Transaction) {
    return trx('roof')
      .where({ property_id })
      .update({
        ...filterValidColumns(payload, await getTableColumns('roof', trx)),
      });
  }

  /**Returns the data associated with roof service events. */
  async getServiceData(eventId: string) {
    const [data] = await db('service_events.roof_service_event as ese')
      .join(db.raw('service_events.roof_service_type as est on est.id = ese.service_work_type_id'))
      .where({ 'ese.event_id': eventId })
      .select('est.label as service_work_type_label');
    return data;
  }
}

export const roofs = new Roofs();
