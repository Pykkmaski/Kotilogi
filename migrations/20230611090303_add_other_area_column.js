/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'properties';
const columnName = 'other_area';

exports.up = function(knex) {
  return knex.schema.table(tableName, tbl => tbl.string(columnName));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table(tableName, tbl => tbl.dropColumn(columnName));
};