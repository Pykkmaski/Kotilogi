/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const [restorable_type_id] = await knex('events.types')
        .where({ label: 'Huoltotyö' })
        .pluck('id');

      const trx = await knex.transaction();
      const stream = trx('map_workTargetsToMainEventType')
        .where({ mainEventTypeId: restorable_type_id })
        .stream();

      for await (const entry of stream) {
        const { targetId } = entry;
        await trx('events.serviceable_target_type').insert({
          target_id: targetId,
        });
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
  return new Promise(async (resolve, reject) => {
    try {
      const trx = await knex.transaction();
      const stream = await trx('events.serviceable_target_type');
      const [renovation_event_id] = await trx('events.types')
        .where({ label: 'Huoltotyö' })
        .pluck('id');

      for await (const entry of stream) {
        await trx('map_workTargetsToMainEventType')
          .insert({
            mainEventTypeId: renovation_event_id,
            targetId: entry.target_id,
          })
          .onConflict('label')
          .ignore();
      }

      await trx.commit();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
