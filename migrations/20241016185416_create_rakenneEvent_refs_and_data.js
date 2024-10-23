/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const dataTableName = 'data_structureEvents';
const targetsTableName = 'ref_structureEventTargets';

exports.up = function (knex) {
  return knex.schema
    .createTable(targetsTableName, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable(dataTableName, tbl => {
      tbl
        .uuid('id')
        .primary()
        .references('id')
        .inTable('data_propertyEvents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('targetId')
        .notNullable()
        .references('id')
        .inTable(targetsTableName)
        .onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(dataTableName).dropTableIfExists(targetsTableName);
};
