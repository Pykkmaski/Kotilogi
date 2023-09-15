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

const newColumnName = 'ref_id'

exports.up = function(knex) {
 return knex.schema.alterTable(tableName.properties, tbl => {
    tbl.renameColumn('owner', newColumnName);
 })
 .alterTable(tableName.property_files, tbl => {
    tbl.renameColumn('property_id', newColumnName);
 })
 .alterTable(tableName.property_images, tbl => {
    tbl.renameColumn('property_id', newColumnName);
 })
 .alterTable(tableName.events, tbl => {
    tbl.renameColumn('property_id', newColumnName);
 })
 .alterTable(tableName.event_files, tbl => {
    tbl.renameColumn('event_id', newColumnName);
 })
 .alterTable(tableName.event_images, tbl => {
    tbl.renameColumn('event_id', newColumnName);
 });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable(tableName.properties, tbl => {
        tbl.renameColumn(newColumnName, 'owner');
    })
    .alterTable(tableName.property_files, tbl => {
        tbl.renameColumn(newColumnName, 'property_id');
    })
    .alterTable(tableName.property_images, tbl => {
        tbl.renameColumn(newColumnName, 'property_id');
    })
    .alterTable(tableName.events, tbl => {
        tbl.renameColumn(newColumnName, 'property_id');
    })
    .alterTable(tableName.event_files, tbl => {
        tbl.renameColumn(newColumnName, 'event_id');
    })
    .alterTable(tableName.event_images, tbl => {
        tbl.renameColumn(newColumnName, 'event_id');
    });
};
