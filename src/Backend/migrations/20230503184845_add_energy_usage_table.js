/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('energy_usage', tbl => {
    tbl.increments('id');
    tbl.integer('property_id').references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE');
    tbl.integer('time').notNullable();
    tbl.float('watt_amount').defaultTo(0);
    tbl.float('price').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('energy_usage');
};
