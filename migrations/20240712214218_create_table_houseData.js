/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'houseData';

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

    tbl.string('propertyNumber').notNullable();
    tbl.integer('yardOwnershipType');
    tbl.integer('yardArea');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
