import { Knex } from 'knex';
import { BuildingDataType, RoofDataType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import db from 'kotilogi-app/dbconfig';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { roofSchema } from 'kotilogi-app/utils/models/roofSchema';
import { events } from './events';

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

    console.log(roof);
    //Filter out nulls from the data
    const entries = roof?.data
      ? Object.values(roof.data).filter(([key, val]) => val !== null)
      : (null as TODO);
    return entries ? Object.fromEntries(entries) : null;
  }

  /**Creates a genesis event for a roof.

   */
  async create(property_id: string, payload: Partial<RoofDataType>, trx: Knex.Transaction) {
    /*
    const [{ roof_types }] = (await trx('types.roof_type').select(
      db.raw('json_object_agg(id, name) as roof_types')
    )) as any;

    const [{ roof_materials }] = (await trx('types.roof_material_type').select(
      db.raw('json_object_agg(id, name) as roof_materials')
    )) as any;

    const [{ eaves_types }] = (await trx('types.roof_eaves_type').select(
      db.raw('json_object_agg(id, label) as eaves_types')
    )) as any;

    const [{ fascia_board_types }] = (await trx('types.roof_fascia_board_type').select(
      db.raw('json_object_agg(id, label) as fascia_board_types')
    )) as any;

    const [{ underlacing_types }] = (await trx('types.roof_underlacing_type').select(
      db.raw('json_object_agg(id, label) as underlacing_types')
    )) as any;

    const [{ colors }] = (await trx('ref_mainColors').select(
      db.raw('json_object_agg(id, name) as colors')
    )) as any;*/

    /*
    const roof = {
      roof_type: roof_types[payload.roofTypeId],
      roof_material: roof_materials[payload.roofMaterialId],
      eaves_type: eaves_types[payload.raystasTyyppiId],
      fascia_board_type: fascia_board_types[payload.otsalautaTyyppiId],
      underlacing_type: underlacing_types[payload.aluskateTyyppiId],
      color: colors[payload.colorId],
      incline: payload.kaltevuus,
      area: payload.neliometrit,
      has_gutters: payload.kourut,
      has_downspout_system: payload.syoksysarja,
      has_security_ladder: payload.turvatikas,
      has_ladder: payload.seinatikas,
      has_roof_bridge: payload.kattosilta,
      has_underlacing_ventilation: payload.harjatuuletusAluskatteella,
      has_treated_wood: payload.suojakasiteltyPuutavara,
      has_chimney_plating: payload.piipunpellitys,
      has_snow_barrier: payload.lumieste,
      lapetikas: payload.lapetikas,
    };
    */

    //const session = await verifySession();
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
