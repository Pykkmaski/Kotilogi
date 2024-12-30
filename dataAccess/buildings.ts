import { Knex } from 'knex';
import { BuildingDataType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';

export class Buildings {
  async get(property_id: string, ctx: Knex.Transaction | Knex) {
    return ctx('building')
      .where({ property_id })
      .select('building_material_id', 'building_type_id', 'build_year', 'color_id');
  }

  async create(
    property_id: string,
    payload: Partial<BuildingDataType>,
    ctx: Knex.Transaction | Knex
  ) {
    /**TODO: Each property logically can have multiple buildings. Modify the building data table to have its own id, and return that here once created. */
    return ctx('building')
      .insert({
        ...filterValidColumns(payload, await getTableColumns('data', ctx, 'buildings')),
        property_id,
      })
      .onConflict('property_id')
      .merge();
  }

  async update(
    property_id: string,
    payload: Partial<BuildingDataType>,
    ctx: Knex.Transaction | Knex
  ) {
    return ctx('building')
      .where({ property_id })
      .update({
        ...filterValidColumns(payload, await getTableColumns('data', ctx, 'buildings')),
      });
  }
}

export const buildings = new Buildings();
