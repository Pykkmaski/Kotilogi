/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const refTableName = 'ref_surfaces';
const dataTableName = 'data_surfaces';

exports.up = function (knex) {
  return knex.schema
    .createTable(refTableName, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable(dataTableName, tbl => {
      tbl
        .uuid('id')
        .primary()
        .references('id')
        .inTable('data_propertyEvents')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      tbl
        .integer('surfaceId')
        .notNullable()
        .references('id')
        .inTable(refTableName)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(dataTableName).dropTableIfExists(refTableName);
};
