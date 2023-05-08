/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('properties', tbl => {
    tbl.string('roof_material').defaultTo('Ei määritelty');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('properties', tbl => {
    tbl.dropColumn('roof_material');
  })
};
