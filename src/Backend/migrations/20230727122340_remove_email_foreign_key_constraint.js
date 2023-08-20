/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'user_activation_codes';
const columnName = 'user';

exports.up = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.dropForeign(columnName);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.foreign(columnName).references('users.email').onDelete('CASCADE').onUpdate('CASCADE');
  });
};
