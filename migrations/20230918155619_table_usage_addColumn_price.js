/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'usage';
const columnName = 'price';

exports.up = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.float(columnName);
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
