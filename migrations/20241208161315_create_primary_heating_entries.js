/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    knex.transaction(async function (trx) {
      const stream = trx('property.overview').select('id', 'primaryHeatingSystemId').stream();
      for await (const entry of stream) {
        const [existingHeatingId] = await trx('heating.data')
          .where({ property_id: entry.id, heating_type_id: entry.primaryHeatingSystemId })
          .pluck('id');

        if (!entry.primaryHeatingSystemId || !existingHeatingId) {
          continue;
        }

        await trx('heating.primary_heating').insert(
          knex.raw(`
            (heating_id, property_id) VALUES (
              '${existingHeatingId}',
              '${entry.id}'
            )
          `)
        );
      }

      await trx.commit();
      resolve();
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      await knex('heating.primary_heating').del();
      resolve();
    } catch (err) {
      reject();
    }
  });
};
