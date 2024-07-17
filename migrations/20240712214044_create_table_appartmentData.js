/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'appartmentData';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .uuid('id')
      .notNullable()
      .unique()
      .primary()
      .references('id')
      .inTable('propertyData')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.integer('floorNumber');
    tbl.integer('appartmentNumber').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
