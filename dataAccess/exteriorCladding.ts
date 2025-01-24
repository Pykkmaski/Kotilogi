import { Knex } from 'knex';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import db from 'kotilogi-app/dbconfig';

class ExteriorCladding {
  /**Saves exterior cladding related data for a given event id. */
  async create(eventId: string, data: TODO, ctx: Knex | Knex.Transaction) {
    await ctx('exterior_cladding').insert({
      ...filterValidColumns(data, await getTableColumns('exterior_cladding', ctx)),
      event_id: eventId,
    });

    //Insert the additional insulation data
    if (data.has_additional_insulation) {
      await ctx('exterior_cladding_additional_insulation').insert({
        ...filterValidColumns(
          data,
          await getTableColumns('exterior_cladding_additional_insulation', ctx)
        ),
        event_id: eventId,
      });
    }

    //Insert the wind protection plate data
    if (data.has_wind_protection_plate) {
      await ctx('exterior_cladding_wind_protection_plate').insert({
        ...filterValidColumns(
          data,
          await getTableColumns('exterior_cladding_wind_protection_plate', ctx)
        ),
        event_id: eventId,
        //The thickness-property has a more verbose name for the input the user interacts with. Set it manually.
        thickness: data.wind_protection_plate_thickness,
      });
    }
  }

  /**Returns exterior cladding data associated with an event. */
  async get(eventId: string, ctx: Knex | Knex.Transaction) {
    const [data] = await ctx('exterior_cladding')
      .join(
        db.raw(
          'exterior_cladding_additional_insulation as ecai on ecai.event_id = exterior_cladding.event_id'
        )
      )
      .join(
        db.raw(
          'types.exterior_cladding_material_type as ecmt on ecmt.id = exterior_cladding.exterior_cladding_material_type_id'
        )
      )
      .join(
        db.raw(
          'exterior_cladding_wind_protection_plate as ecwpp on ecwpp.event_id = exterior_cladding.event_id'
        )
      )
      .where({ 'exterior_cladding.event_id': eventId })
      .select(
        'exterior_cladding.*',
        'ecwpp.*',
        'ecai.*',
        'ecmt.label as exterior_cladding_material_type_label'
      );
    console.log('rypäx: ', data);
    return data;
  }
}

export const exteriorCladding = new ExteriorCladding();
