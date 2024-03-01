/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'properties';
const columnname = 'propertyNumber';

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.string(columnname).unique();
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
