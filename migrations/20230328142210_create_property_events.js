/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('property_events', tbl => {
    tbl.increments('id');
    tbl.integer('property_id').references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE');
    
    tbl.string('info', 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('property_events');
};
