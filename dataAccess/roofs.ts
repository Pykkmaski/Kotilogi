import { Knex } from 'knex';
import { BuildingDataType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';

class Roofs {
  async create(building_id: string, payload: Partial<BuildingDataType>, trx: Knex.Transaction) {
    return trx('roofs.overview').insert({
      ...filterValidColumns(payload, await getTableColumns('overview', trx, 'roofs')),
      building_id,
    });
  }

  async update(roof_id: string, payload: Partial<BuildingDataType>, trx: Knex.Transaction) {
    return trx('roofs.overview')
      .where({ id: roof_id })
      .update({
        ...filterValidColumns(payload, await getTableColumns('overview', trx, 'roofs')),
      });
  }
}

export const roofs = new Roofs();
