/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableNames = {
    propertiesTable: 'properties',
    eventsTable: 'property_events',
}

const columnName = 'main_image_id';

exports.up = function(knex) {
  return knex.schema.alterTable(tableNames.propertiesTable, tbl => {
    tbl.string(columnName).references('id').inTable('property_images').onUpdate('CASCADE');
  })
  .alterTable(tableNames.eventsTable, tbl => {
    tbl.string(columnName).references('id').inTable('event_images').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tableNames.propertiesTable, tbl => {
    tbl.dropColumn(columnName);
  })
  .alterTable(tableNames.eventsTable, tbl => {
    tbl.dropColumn(columnName);
  });
};
