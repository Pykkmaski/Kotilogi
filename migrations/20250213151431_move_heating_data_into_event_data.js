/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      const propertyStream = trx('property').select('id').stream();
      for await (const property of propertyStream) {
        const { id: propertyId } = property;
        const heating = await trx('heating')
          .leftJoin(knex.raw('oil_vessel on oil_vessel.heating_id = heating.id'))
          .leftJoin(knex.raw('warm_water_reservoir as wwr on wwr.heating_id = heating.id'))
          .leftJoin(knex.raw('heating_center as hc on hc.heating_id = heating.id'))
          .join(knex.raw('types.heating_type as ht on ht.id = heating.heating_type_id'))

          .select(
            'heating.*',
            knex.raw(
              'CASE WHEN oil_vessel.heating_id IS NOT NULL THEN row_to_json(oil_vessel) ELSE NULL END as oil_vessel'
            ),
            knex.raw(
              'CASE WHEN wwr.heating_id IS NOT NULL THEN row_to_json(wwr) ELSE NULL END as warm_water_reservoir'
            ),
            knex.raw(
              'CASE WHEN hc.heating_id IS NOT NULL THEN row_to_json(hc) ELSE NULL END as heating_center'
            ),
            'ht.name as heating_type'
          );
        console.log(heating);
        throw new Error('Not implemented yet.');
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
  return Promise.resolve();
};
