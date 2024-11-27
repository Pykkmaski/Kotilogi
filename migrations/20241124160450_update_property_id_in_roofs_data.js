/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const trx = await knex.transaction();
      const roofs = trx('roofs.data').select('id').stream();
      for await (const roof of roofs) {
        const [property_id] = await trx('public.data_objects')
          .where({ id: roof.id })
          .pluck('parentId');

        //Update the property id column in roofs data
        await trx('roofs.data').where({ id: roof.id }).update({
          property_id,
        });
      }

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
