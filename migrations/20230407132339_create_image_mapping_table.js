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
    tbl.boolean('property_main').defaultTo(false);
    tbl.boolean('event_main').defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('image_map');
};
