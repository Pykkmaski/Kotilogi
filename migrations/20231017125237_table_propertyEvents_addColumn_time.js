/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'propertyEvents';
const columnName = 'time';

exports.up = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.bigint(columnName).comment('The time in milliseconds since the epoch.');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.dropColumn(columnName);
  });
};
