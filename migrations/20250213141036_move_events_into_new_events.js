/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      const stream = trx('event').join(knex.raw('object on object.id = event.id')).stream();
      let promises = [];
      for await (const e of stream) {
        if (promises.length >= 10) {
          await Promise.all(promises);
          promises = [];
        }
        promises.push(
          trx('new_events').insert({
            id: e.id,
            title: e.title,
            description: e.description,
            author_id: e.authorId,
            property_id: e.property_id,
            date: e.date,
            material_expenses: e.material_expenses,
            labour_expenses: e.labour_expenses,
            event_type: e.event_type_id,
            target_type: e.target_id,
          })
        );
      }

      if (promises.length > 0) {
        await Promise.all(promises);
      }
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
  return knex('new_events').del();
};
