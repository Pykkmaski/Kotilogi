/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

function transformRoofData(payload, types) {
  return {
    roof_type: types.roof_types[payload.roofTypeId],
    roof_material: types.roof_materials[payload.roofMaterialId],
    eaves_type: types.eaves_types[payload.raystasTyyppiId],
    fascia_board_type: types.fascia_board_types[payload.otsalautaTyyppiId],
    underlacing_type: types.underlacing_types[payload.aluskateTyyppiId],
    color: types.colors[payload.colorId],
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
}
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      const roofs = trx('roof').stream();

      const [{ roof_types }] = await trx('types.roof_type').select(
        knex.raw('json_object_agg(id, name) as roof_types')
      );

      const [{ roof_materials }] = await trx('types.roof_material_type').select(
        knex.raw('json_object_agg(id, name) as roof_materials')
      );

      const [{ eaves_types }] = await trx('types.roof_eaves_type').select(
        knex.raw('json_object_agg(id, label) as eaves_types')
      );

      const [{ fascia_board_types }] = await trx('types.roof_fascia_board_type').select(
        knex.raw('json_object_agg(id, label) as fascia_board_types')
      );

      const [{ underlacing_types }] = await trx('types.roof_underlacing_type').select(
        knex.raw('json_object_agg(id, label) as underlacing_types')
      );

      const [{ colors }] = await trx('ref_mainColors').select(
        knex.raw('json_object_agg(id, name) as colors')
      );
      for await (const r of roofs) {
        //Get an existing roof restoration event
        const roofEvent = await trx('new_events')
          .where({
            property_id: r.property_id,
            event_type: 'Peruskorjaus',
            target_type: 'Katto',
          })
          .orderBy('date', 'desc', 'last')
          .first();
        const roofData = transformRoofData(r, {
          fascia_board_types,
          roof_types,
          roof_materials,
          eaves_types,
          underlacing_types,
          colors,
        });
        //Insert the roof into the data column, if a roof event exists.
        if (roofEvent) {
          await trx('new_events').where({ id: roofEvent.id }).update({
            data: roofData,
          });
        } else {
          //Otherwise, create a genesis-event for the roof.
          await trx('new_events').insert({
            property_id: r.property_id,
            title: 'Katon tietojen lisäys',
            event_type: 'Genesis',
            target_type: 'Roof',
            date: null,
            data: roofData,
          });
        }
        await trx.commit();
        resolve();
      }
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex('new_events')
    .whereIn('event_type', ['Peruskorjaus', 'Genesis'])
    .andWhere({ target_type: 'Katto' })
    .update({
      data: null,
    });
};
