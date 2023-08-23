/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'users';
const columnName = 'active';

exports.up = function(knex) {
  return knex.schema.table(tableName, tbl => {
    tbl.boolean(columnName).defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schea.table(tableName, tbl => {
    tbl.dropColumn(columnName);
  });
};
