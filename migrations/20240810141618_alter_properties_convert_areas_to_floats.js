/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_properties';
const cols = ['livingArea', 'otherArea'];

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    await Promise.all(
      cols.map(col =>
        knex.schema.alterTable(table, tbl => {
          tbl.float(col).alter();
        })
      )
    );

    const trx = await knex.transaction();
    try {
      const stream = trx(table)
        .select([...cols, 'id'])
        .stream();

      for await (const p of stream) {
        await trx(table)
          .where({ id: p.id })
          .update({
            livingArea: p.livingArea / 100,
            otherArea: p.otherArea / 100,
          });
      }
      await trx.commit();
    } catch (err) {
      await trx.rollback();
      reject(err);
    }

    resolve();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
