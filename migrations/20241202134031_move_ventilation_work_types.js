/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const [target_id] = await knex('events.targets').where({ label: 'Ilmanvaihto' }).pluck('id');

      const trx = await knex.transaction();
      const stream = trx('map_workTypeToTarget')
        .join(
          trx.raw('?? ON ?? = ??', [
            'ref_eventWorkTypes',
            'ref_eventWorkTypes.id',
            'map_workTypeToTarget.workTypeId',
          ])
        )
        .where({ 'map_workTypeToTarget.targetId': target_id })
        .select('ref_eventWorkTypes.label as service_work_type')
        .stream();

      for await (const entry of stream) {
        const { service_work_type } = entry;
        await trx('ventilation.service_work_type')
          .insert({
            label: service_work_type,
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

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
