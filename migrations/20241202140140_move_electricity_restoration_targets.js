/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const trx = await knex.transaction();
      const stream = trx('ref_electricityJobTargets').pluck('label').stream();
      for await (const entry of stream) {
        await trx('electricity.restoration_work_target').insert(entry).onConflict('label').ignore();
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
