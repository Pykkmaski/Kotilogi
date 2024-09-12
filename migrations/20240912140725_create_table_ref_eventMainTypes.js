/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_mainEventTypes';
exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.increments('id');
    tbl.string('name', 32).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
