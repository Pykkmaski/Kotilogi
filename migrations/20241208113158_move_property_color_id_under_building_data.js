/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      await knex.transaction(async function (trx) {
        const stream = trx('property.overview').select('id', 'mainColorId').stream();
        for await (const entry of stream) {
          await trx('buildings.data').where({ property_id: entry.id }).update({
            color_id: entry.mainColorId,
          });
        }

        await trx.commit();
        resolve();
      });
    } catch (err) {
      reject();
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
        const stream = trx('buildings.data')
          .select('property_id', 'color_id as mainColorId')
          .stream();
        for await (const entry of stream) {
          await trx('property.overview').where({ id: entry.property_id }).update({
            mainColorId: entry.mainColorId,
          });
        }

        await trx.commit();
        resolve();
      });
    } catch (err) {
      reject();
    }
  });
};
