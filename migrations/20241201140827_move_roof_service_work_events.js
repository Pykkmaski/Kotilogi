/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const [roof_target_id] = await knex('events.targets').where({ label: 'Katto' }).pluck('id');
      const [service_work_id] = await knex('events.types')
        .where({ label: 'Huoltotyö' })
        .pluck('id');

      const trx = await knex.transaction();
      const stream = trx('events.data')
        .where({ targetId: roof_target_id, mainTypeId: service_work_id })
        .stream();

      for await (const entry of stream) {
        const { workTypeId } = entry;
        const [service_work_id] = await trx('roofs.service_work_type')
          .where({ id: workTypeId })
          .pluck('id');

        await trx('roofs.service_work').insert({
          service_work_id,
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
exports.down = function (knex) {};
