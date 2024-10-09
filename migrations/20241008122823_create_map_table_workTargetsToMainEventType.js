/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'map_workTargetsToMainEventType';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .integer('mainEventTypeId')
      .notNullable()
      .references('id')
      .inTable('ref_mainEventTypes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('targetId')
      .notNullable()
      .references('id')
      .inTable('ref_eventTargets')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.primary(['mainEventTypeId', 'targetId']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
