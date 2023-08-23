/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('property_files', tbl => {
    tbl.increments('id');
    tbl.integer('property_id').references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE');
    tbl.string('filename').notNullable();
    tbl.string('mime_type').notNullable();
    tbl.boolean('main').defaultTo(false).comment('In case of images, is this the main image for the property?');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('property_files');
};
