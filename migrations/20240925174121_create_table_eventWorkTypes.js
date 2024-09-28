/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//Peruskorjauksen työtyypit.
const table = 'ref_eventWorkTypes';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.increments('id');

    tbl
      .integer('mainEventTypeId')
      .notNullable()
      .references('id')
      .inTable('ref_mainEventTypes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('eventTargetId')
      .references('id')
      .inTable('ref_eventTargets')
      .onUpdate('CASCADE')
      .comment('The event target this work can be done on.');

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
