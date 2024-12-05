/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const [roof_target_id] = await knex('events.targets').where({ label: 'Katto' }).pluck('id');
      const trx = await knex.transaction();
      const stream = trx('map_workTypeToTarget').where({ targetId: roof_target_id }).stream();

      for await (const entry of stream) {
        const [work_type_label] = await trx('ref_eventWorkTypes')
          .where({ id: entry.workTypeId })
          .pluck('label');

        await trx('roofs.service_work_type').insert({
          label: work_type_label,
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
  return new Promise(async (resolve, reject) => {});
};
