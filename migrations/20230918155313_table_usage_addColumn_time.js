/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'usage';
const columnName = 'time';

exports.up = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.integer(columnName);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.dropColumn(columnName);
      })
};
