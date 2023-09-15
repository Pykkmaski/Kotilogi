/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = {
    properties: 'properties',
    events: 'property_events',
    property_images: 'property_images',
    property_files: 'property_files',
    event_images: 'event_images',
    event_files: 'event_files',
    users: 'users',
}

const newColumnName = 'title'

exports.up = function(knex) {
  return knex.schema.alterTable(tableName.properties, tbl => {
    tbl.renameColumn('address', newColumnName).comment('The property address');
  })
  .alterTable(tableName.events, tbl => {
    tbl.renameColumn('name', newColumnName);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable(tableName.properties, tbl => {
        tbl.renameColumn(newColumnName, 'address').comment('');
      })
      .alterTable(tableName.events, tbl => {
        tbl.renameColumn(newColumnName, 'name');
      });
};
