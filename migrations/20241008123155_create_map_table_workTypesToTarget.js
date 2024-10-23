/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'map_workTypeToTarget';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .integer('targetId')
      .notNullable()
      .references('id')
      .inTable('ref_eventTargets')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('workTypeId')
      .notNullable()
      .references('id')
      .inTable('ref_eventWorkTypes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.primary(['targetId', 'workTypeId']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
