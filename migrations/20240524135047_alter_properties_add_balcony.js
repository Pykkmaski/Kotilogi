/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'properties';
const column = 'hasBalcony';

exports.up = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.boolean(column);
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
