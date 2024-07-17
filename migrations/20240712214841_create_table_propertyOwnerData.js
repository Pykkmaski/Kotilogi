/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'propertyOwnerData';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.uuid('id').primary().unique().defaultTo(knex.fn.uuid());
    tbl
      .uuid('userId')
      .notNullable()
      .references('id')
      .inTable('userData')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .uuid('propertyId')
      .notNullable()
      .references('id')
      .inTable('propertyData')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.bigint('timestamp').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
