/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'usage';
const columnName = 'id';

exports.up = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.string(columnName);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schmea.alterTable(tableName, tbl => {
    tbl.dropColumn(columnName);
  })
};
