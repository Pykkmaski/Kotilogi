import { Knex } from 'knex';
import { InteriorDataType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';

class Interiors {
  async get(property_id: string, ctx: Knex.Transaction | Knex) {
    return ctx('interior')
      .where({ property_id })
      .select('room_count', 'floor_count', 'bathroom_count', 'living_area', 'other_area');
  }

  async create(
    property_id: string,
    payload: Partial<InteriorDataType>,
    ctx: Knex.Transaction | Knex
  ) {
    return ctx('interior')
      .insert({
        ...filterValidColumns(payload, await getTableColumns('interior', ctx, 'property')),
        property_id,
      })
      .onConflict('property_id')
      .merge();
  }

  async update(
    property_id: string,
    payload: Partial<InteriorDataType>,
    ctx: Knex.Transaction | Knex
  ) {
    return ctx('interior')
      .where({ property_id })
      .update({
        ...filterValidColumns(payload, await getTableColumns('interior', ctx, 'property')),
      });
  }
}

export const interiors = new Interiors();
