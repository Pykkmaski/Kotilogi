/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('properties', tbl => {
    tbl.string('color').defaultTo('Undefined');
    tbl.string('yard_ownership').defaultTo('Undefined');
    tbl.float('yard_area').defaultTo('Undefined');
    tbl.float('area').defaultTo('Undefined');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('properties', tbl => {
        tbl.dropColumn('color').dropColumn('yard_ownership').dropColumn('yard_area').dropColumn('area');
    })
};
