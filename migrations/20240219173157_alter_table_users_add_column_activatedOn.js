/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'users';
const columnName = 'activatedOn';

exports.up = function(knex) {
    return knex.schema.alterTable(tablename, tbl => {
        tbl.string(columnName);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropColumn(columnName);
  });
};
