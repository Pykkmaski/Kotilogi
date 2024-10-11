/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const mainTable = 'data_lockEvents';
const lockTypesTable = 'ref_lockTypes';

exports.up = function (knex) {
  return knex.schema
    .createTable(lockTypesTable, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable(mainTable, tbl => {
      tbl
        .uuid('id')
        .primary()
        .references('id')
        .inTable('data_propertyEvents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('lockTypeId').references('id').inTable(lockTypesTable).onUpdate('CASCADE');
      tbl.string('model', 32);
      tbl.string('brand', 32);
      tbl.integer('quantity');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(mainTable).dropTableIfExists(lockTypesTable);
};
