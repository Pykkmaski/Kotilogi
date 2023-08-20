/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('property_events', tbl => {
    tbl.increments('id');
    tbl.integer('property_id').references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE');
    tbl.string('name', 50).notNullable();
    tbl.string('description', 255);
    tbl.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('property_events');
};
