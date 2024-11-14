/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_propertyTransferCodes';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.string('code').notNullable().unique();
    tbl
      .uuid('propertyId')
      .primary()
      .notNullable()
      .references('id')
      .inTable('data_properties')
      .onUpdate('CASCADE');
    tbl.date('expires').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
