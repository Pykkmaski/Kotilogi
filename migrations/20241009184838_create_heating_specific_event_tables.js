/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const electricHeatingMethodsTable = 'ref_electricHeatingMethodTypes';
const baseHeatingEventTable = 'data_baseHeatingEvents';
const oilHeatingEventTable = 'data_oilHeatingEvents';
const electricHeatingEventTable = 'data_electricHeatingEvents';

exports.up = function (knex) {
  const referToBaseHeatingEventsId = tbl =>
    tbl
      .uuid('id')
      .primary()
      .notNullable()
      .references('id')
      .inTable(baseHeatingEventTable)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

  return knex.schema
    .createTable(electricHeatingMethodsTable, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable(baseHeatingEventTable, tbl => {
      tbl
        .uuid('id')
        .primary()
        .notNullable()
        .references('id')
        .inTable('data_propertyEvents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      tbl.string('model');
      tbl.string('brand');
      tbl
        .integer('newSystemId')
        .notNullable()
        .references('id')
        .inTable('ref_heatingTypes')
        .onUpdate('CASCADE');
      tbl.integer('oldSystemId').references('id').inTable('ref_heatingTypes').onUpdate('CASCADE');
    })
    .createTable(oilHeatingEventTable, tbl => {
      referToBaseHeatingEventsId(tbl);
      tbl.float('vesselVolume');
      tbl.text('location');
    })
    .createTable(electricHeatingEventTable, tbl => {
      referToBaseHeatingEventsId(tbl);
      tbl
        .integer('methodId')
        .notNullable()
        .references('id')
        .inTable(electricHeatingMethodsTable)
        .onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists(electricHeatingEventTable)
    .dropTableIfExists(oilHeatingEventTable)
    .dropTableIfExists(baseHeatingEventTable)
    .dropTableIfExists(electricHeatingMethodsTable);
};
