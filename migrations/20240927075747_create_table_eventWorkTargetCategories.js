/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_eventWorkTargetCategories';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .integer('eventMainTypeId')
      .notNullable()
      .references('id')
      .inTable('ref_mainEventTypes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('workTargetId')
      .notNullable()
      .references('id')
      .inTable('ref_eventTargets')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.primary(['eventMainTypeId', 'workTargetId']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
