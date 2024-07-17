/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'historyData';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.uuid('id').unique().primary().defaultTo(knex.fn.uuid());
    tbl
      .uuid('refId')
      .notNullable()
      .references('id')
      .inTable('objectData')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('columnName').notNullable();
    tbl.string('oldValue').notNullable();
    tbl.string('newValue').notNullable();
    tbl.string('reason');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
