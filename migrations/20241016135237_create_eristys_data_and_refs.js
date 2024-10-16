/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const refMaterialTableName = 'ref_eristeMateriaalit';
const refTargetTableName = 'ref_eristeKohde';
const dataTableName = 'data_eristeEvents';

exports.up = function (knex) {
  return knex.schema
    .createTable(refMaterialTableName, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable(refTargetTableName, tbl => {
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
        .integer('materiaaliId')
        .notNullable()
        .references('id')
        .inTable('ref_eristeMateriaalit')
        .onUpdate('CASCADE');

      tbl
        .integer('kohdeId')
        .notNullable()
        .references('id')
        .inTable(refTargetTableName)
        .onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists(dataTableName)
    .dropTableIfExists(refMaterialTableName)
    .dropTableIfExists(refTargetTableName);
};
