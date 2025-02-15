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
        const mostRecentId = await trx('new_events')
          .where({
            property_id: property.id,
            event_type: 'Peruskorjaus',
            target_type: 'Lämmitysmuoto',
          })
          .orderBy('date', 'desc', 'last')
          .select('id')
          .first();

        if (mostRecentId) {
          //Move the restoration, and heating info about the event as part of the data column.
          //Get the restoration event
          const res = await trx('restoration_events.heating_restoration_event as res')
            //Join the new heating type
            .join(knex.raw('types.heating_type as nht on nht.id = res.new_system_id'))
            //Join the old heating type
            .leftJoin(knex.raw('types.heating_type as oht on oht.id = res.old_system_id'))
            .select(
              knex.raw('CASE WHEN oht IS NOT NULL THEN oht.name END AS old_heating_type'),
              'nht.name as new_heating_type'
            )
            .first();

          console.log(res);
          throw new Error('Not implemented yet.');
        }
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
