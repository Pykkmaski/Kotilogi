/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const propertyImagesTableName = 'property_images';
const eventImagesTableName = 'event_images';

exports.up = function(knex) {
  return knex.schema.createTable(propertyImagesTableName, tbl => {
    tbl.string('title')
    tbl.string('id').notNullable().unique().primary();
    tbl.string('property_id').notNullable().references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE')
    tbl.string('filename').notNullable()
    tbl.string('description');
  })
  .createTable(eventImagesTableName, tbl => {
    tbl.string('title')
    tbl.string('id').notNullable().unique().primary();
    tbl.string('event_id').notNullable().references('id').inTable('property_events').onDelete('CASCADE').onUpdate('CASCADE')
    tbl.string('filename').notNullable()
    tbl.string('description');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable(propertyImagesTableName).dropTable(eventImagesTableName);
};
