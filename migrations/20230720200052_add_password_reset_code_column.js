/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const columnName = 'password_reset_code';
const tableName = 'users';

exports.up = function(knex) {
  return knex.schema.table(tableName, tbl => {
    tbl.string(columnName);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table(tableName, tbl => {
    tbl.dropColumn(columnName);
  });
};
