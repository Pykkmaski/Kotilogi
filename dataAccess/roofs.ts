import { Knex } from 'knex';
import { BuildingDataType, RoofDataType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import db from 'kotilogi-app/dbconfig';

class Roofs {
  async getTypes(ctx: Knex | Knex.Transaction) {
    return await ctx('types.roof_type').select(db.raw('json_object_agg(name, id) as result'));
  }

  async get(property_id: string, ctx: Knex | Knex.Transaction) {
    return ctx('roof')
      .where({ property_id })
      .select(
        'roofTypeId',
        'roofMaterialId',
        'raystasTyyppiId',
        'colorId',
        'kaltevuus',
        'neliometrit',
        'otsalautaTyyppiId',
        'aluskateTyyppiId',
        'harjatuuletusAluskatteella',
        'suojakasiteltyPuutavara',
        'piipunpellitys',
        'lapetikas',
        'lumieste',
        'kattosilta',
        'turvatikas',
        'kourut',
        'syoksysarja'
      );
  }

  async create(property_id: string, payload: Partial<RoofDataType>, trx: Knex.Transaction) {
    return trx('roof').insert({
      ...filterValidColumns(payload, await getTableColumns('roof', trx)),
      property_id,
    });
  }

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
