/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'propertyEventData';
const column = 'startTime';

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      await knex.schema.alterTable(table, tbl => {
        tbl.bigint(column);
      });

      const stream = knex(table).select('id', 'time').stream();
      for await (const ev of stream) {
        await knex(table).where({ id: ev.id }).update({
          startTime: ev.time,
        });
      }

      await knex.schema.alterTable(table, tbl => {
        tbl.dropColumn(table);
      });

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
  return knex.schema.alterTable(table, tbl => {
    tbl.dropColumn(column);
  });
};
