/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('image_map', tbl => {
    tbl.increments('id');
    tbl.string('filename').notNullable();
    tbl.integer('property_id').notNullable().references('id').inTable('properties');
    tbl.integer('event_id').references('id').inTable('property_events');
    tbl.boolean('property_main').defaultTo(false).comment('Is this the main image for a property?');
    tbl.boolean('event_main').defaultTo(false).comment('Is this the main image for an event?');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('image_map');
};
