/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'properties';
const columnName = 'energy_class';

exports.up = function(knex) {
  return knex.schema.table(tableName, tbl => {
    tbl.string(columnName, 1);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table(tableName, tbl => {
    tbl.dropColumn(columnName);
  })
};
