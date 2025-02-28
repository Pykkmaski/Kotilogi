import { Knex } from 'knex';
import { InteriorDataType } from '../../../dataAccess/types';
import { filterValidColumns } from '../../../dataAccess/utils/filterValidColumns';
import { getTableColumns } from '../../../dataAccess/utils/getTableColumns';

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
        ...filterValidColumns(payload, await getTableColumns('interior', ctx)),
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
        ...filterValidColumns(payload, await getTableColumns('interior', ctx)),
      });
  }
}

export const interiors = new Interiors();
