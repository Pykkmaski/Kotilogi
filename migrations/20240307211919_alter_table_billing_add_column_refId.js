/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'billing';
const columnname = 'refId';

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.string(columnname).notNullable().comment('The id of the item this bill is for.');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropColumn(columnname);
  });
};
