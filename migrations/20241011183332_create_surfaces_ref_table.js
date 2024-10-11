/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_surfaces';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.increments('id');
    tbl.string('label', 32).unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
