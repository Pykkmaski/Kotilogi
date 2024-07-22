/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'propertyEventData';
const column = 'time';

exports.up = function (knex) {
  return knex.schema.table(table, tbl => {
    tbl.dropColumn(column);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.bigint(column);
  });
};
