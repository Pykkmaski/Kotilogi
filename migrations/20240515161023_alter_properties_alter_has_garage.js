/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'properties';
const column = 'hasGarage';

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      const stream = trx(table).select('id', column).stream();
      for await (const property of stream) {
        await knex(table)
          .where({ id: property.id })
          .update({
            hasGarage: property.hasGarage === 'Kyllä' ? 1 : 0,
          });
      }

      await knex.schema.alterTable(table, tbl => {
        tbl.boolean(column).alter();
      });

      await trx.commit();
      resolve();
    } catch (err) {
      await trx.rollback();
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
    const trx = await knex.transaction();
    try {
      await knex.schema.alterTable(table, tbl => {
        tbl.string(column).alter();
      });

      const stream = trx(table).select('id', column);
      for await (const property of stream) {
        await trx(table)
          .where({ id: property.id })
          .update({
            hasGarage: property.hasGarage === '1' ? 'Kyllä' : 'Ei',
          });
      }

      await trx.commit();
      resolve();
    } catch (err) {
      await trx.rollback();
      reject(err);
    }
  });
};
