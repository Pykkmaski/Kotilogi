/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'propertyEventData';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .uuid('id')
      .notNullable()
      .unique()
      .primary()
      .references('id')
      .inTable('objectData')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.bigint('time').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
