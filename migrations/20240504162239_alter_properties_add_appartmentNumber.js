/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'properties';
const column = 'appartmentNumber';

exports.up = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.integer(column).defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.dropColumn(column);
  });
};
