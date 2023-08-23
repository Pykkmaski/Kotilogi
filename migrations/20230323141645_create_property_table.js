/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('properties', tbl => {
    tbl.increments('id');
    tbl.string('owner').references('username').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    tbl.string('address').unique();
    tbl.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('properties');
};
