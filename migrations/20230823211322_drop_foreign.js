/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'properties';
const columnName = 'owner';

exports.up = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.dropForeign(columnName);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.foreign(columnName).references('username').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
  })
};
