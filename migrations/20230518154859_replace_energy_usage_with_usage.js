/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.dropTableIfExists('energy_usage').createTable('usage', tbl => {
    tbl.string('type');
    tbl.float('price').defaultTo(0);
    tbl.integer('time').defaultTo(new Date().getTime());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usage').createTable('energy_usage', tbl => {
        tbl.float('price').defaultTo(0);
        tbl.integer('time').defaultTo(new Date().getTime());
    });
};
