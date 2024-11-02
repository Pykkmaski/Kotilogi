/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_utilities';
const oldColumn = 'time';
const newColumn = 'date';

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const oldValues = await knex(table).select('id', oldColumn);
      await knex.schema
        .alterTable(table, tbl => tbl.dropColumn(oldColumn))
        .alterTable(table, tbl =>
          tbl.date(newColumn).notNullable().defaultTo(knex.raw('CURRENT_DATE'))
        );

      //Fill in the new old values
      for (const { id, time } of oldValues) {
        await knex(table)
          .where({ id })
          .update({ [newColumn]: new Date(parseInt(time)) });
      }

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
    const oldValues = await knex(table).select('id', newColumn);
    await knex.schema
      .alterTable(table, tbl => tbl.dropColumn(newColumn))
      .alterTable(table, tbl => tbl.bigint(oldColumn));

    for (const { id, date } of oldValues) {
      await knex(table)
        .where({ id })
        .update({ [oldColumn]: date.getTime() });
    }
  });
};
