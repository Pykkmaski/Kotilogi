/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'file_map';

exports.up = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    tbl.increments('id');
    tbl.string('property_id').references('id').inTable('properties').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.string('event_id').references('id').inTable('property_events').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.string('mime_type');
    tbl.boolean('event_main');
    tbl.boolean('property_main');
  });
};
