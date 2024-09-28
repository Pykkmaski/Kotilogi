/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *
 * The parts of a property events can be defined for. Each will refer to a main event type, under which it is logical the part should belong.
 */

const table = 'ref_eventTargets';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.increments('id');
    tbl.string('label', 24).notNullable().unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
