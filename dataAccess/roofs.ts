import { Knex } from 'knex';
import { BuildingDataType, RoofDataType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import db from 'kotilogi-app/dbconfig';
import { verifySession } from 'kotilogi-app/utils/verifySession';

class Roofs {
  async getTypes(ctx: Knex | Knex.Transaction) {
    return await ctx('types.roof_type').select(db.raw('json_object_agg(name, id) as result'));
  }

  async get(property_id: string, ctx: Knex | Knex.Transaction) {
    //Todo: fetch the most recent genesis- or restoration event for a roof, and get the data from there.
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

  /**Creates a genesis event for a roof. */
  async create(property_id: string, payload: Partial<RoofDataType>, trx: Knex.Transaction) {
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
    )) as any;

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

    const session = await verifySession();

    return trx('new_events').insert({
      property_id,
      event_type: 'Genesis',
      target_type: 'Katto',
      title: 'Katon tietojen lisäys',
      author_id: session.user.id,
      date: null,
      data: roof,
    });
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
