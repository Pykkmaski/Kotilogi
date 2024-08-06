/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_propertyEventSteps';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .uuid('id')
      .primary()
      .notNullable()
      .references('id')
      .inTable('data_objects')
      .onDelete('CASCADE');

    tbl.bigint('time');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
