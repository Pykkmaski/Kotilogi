/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//Peruskorjauksen työtyypit.
const table = 'ref_eventWorkTypes';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.increments('id');
    tbl.string('label', 32).unique().notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
