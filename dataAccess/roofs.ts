import { Knex } from 'knex';
import { BuildingDataType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import db from 'kotilogi-app/dbconfig';

class Roofs {
  async getTypes(ctx: Knex | Knex.Transaction) {
    return await ctx('roofs.types').select(db.raw('json_object_agg(name, id) as result'));
  }

  async create(property_id: string, payload: Partial<BuildingDataType>, trx: Knex.Transaction) {
    return trx('roofs.overview')
      .insert({
        ...filterValidColumns(payload, await getTableColumns('overview', trx, 'roofs')),
        property_id,
      })
      .onConflict('property_id')
      .merge();
  }

  async update(property_id: string, payload: Partial<BuildingDataType>, trx: Knex.Transaction) {
    return trx('roofs.overview')
      .where({ property_id })
      .update({
        ...filterValidColumns(payload, await getTableColumns('overview', trx, 'roofs')),
      });
  }
}

export const roofs = new Roofs();
