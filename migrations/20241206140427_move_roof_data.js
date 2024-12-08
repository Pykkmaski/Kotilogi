/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      await knex.transaction(async function (trx) {
        const stream = trx('property.overview')
          .select('roofTypeId', 'roofMaterialId', 'id as property_id')
          .stream();

        for await (const entry of stream) {
          await trx('roofs.overview')
            .insert({
              ...entry,
            })
            .onConflict('property_id')
            .ignore();
        }

        await trx.commit();
        resolve();
      });
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
  return new Promise(async (resolve, reject) => {
    try {
      await knex.transaction(async function (trx) {
        const stream = trx('property.overview')
          .select('roofTypeId', 'roofMaterialId', 'property_id as id')
          .stream();

        for await (const entry of stream) {
          await trx('poperty.overview').where({ id: entry.id }).update(entry);
        }

        await trx.commit();
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
};
