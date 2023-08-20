/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('property_events', tbl => {
    tbl.string('date').notNullable().defaultTo('-');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('property_events', tbl => {
        tbl.dropColumn('date');
    });
};
