/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'billing';
const columnname = 'status';
const values = ['ok', 'canceled', 'unpaid'];

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.string(columnname).checkIn(values).notNullable().defaultTo(values[0]);
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
