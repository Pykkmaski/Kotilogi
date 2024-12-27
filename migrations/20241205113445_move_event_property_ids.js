/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const trx = await knex.transaction();
      const stream = await trx('events.data')
        .join(knex.raw('objects.data ON objects.data.id = events.data.id'))
        .select('events.data.id as event_id', 'objects.data.parentId as property_id')
        .stream();

      const promises = [];
      for await (const entry of stream) {
        const t = trx('events.data').where({ id: entry.event_id }).update({
          property_id: entry.property_id,
        });

        promises.push(t);
      }
      await Promise.all(promises);
      await trx.commit();
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
exports.down = function (knex) {
  return Promise.resolve();
};
