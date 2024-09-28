/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_propertyEvents';

exports.up = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.integer('mainTypeId');
    tbl
      .integer('targetId')

      .references('id')
      .inTable('ref_eventTargets')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .comment(
        'The id of the target inside the property the event refers to, for example the heating system.'
      );

    tbl
      .integer('workTypeId')
      .references('id')
      .inTable('ref_eventWorkTypes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.dropColumn('mainTypeId').dropColumn('targetId').dropColumn('workTypeId');
  });
};
