/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('properties', tbl => {
    tbl.string('roof_type').defaultTo('Undefined');
    tbl.float('floor_count').defaultTo(1);
    tbl.integer('wc_count').defaultTo(1);
    tbl.integer('room_count').defaultTo(1);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('properties', tbl => {
    tbl.dropColumn('roof_type').dropColumn('floor_count').dropColumn('wc_count').dropColumn('room_count');
  })
};
