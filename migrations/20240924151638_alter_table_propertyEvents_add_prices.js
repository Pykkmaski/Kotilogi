/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_propertyEvents';

exports.up = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.float('labourExpenses').defaultTo(0);
    tbl.float('materialExpenses').defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.dropColumn('labourExpenses');
    tbl.dropColumn('materialExpenses');
  });
};
