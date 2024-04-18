/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'propertyEvents';
const columnname = 'createdBy';

exports.up = function (knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.string(columnname);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropColumn();
  });
};
