/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('event_files', tbl => {
    tbl.increments('id');
    tbl.integer('event_id').references('id').inTable('property_events').onDelete('CASCADE').onDelete('CASCADE');
    tbl.string('filename').notNullable();
    tbl.string('mime_type').notNullable();
    tbl.boolean('main').defaultTo(false).comment('In case of images, is this the main image for the event?');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('event_files');
};
