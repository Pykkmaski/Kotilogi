/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('property').alterTable('overview', tbl => {
    tbl.dropColumn('wcCount');
    tbl.dropColumn('otherArea');
    tbl.dropColumn('livingArea');
    tbl.dropColumn('floorCount');
    tbl.dropColumn('roomCount');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('property').alterTable('overview', tbl => {
    tbl.integer('wcCount');
    tbl.float('otherArea', 8, 2);
    tbl.float('livingArea', 8, 2);
    tbl.integer('floorCount');
    tbl.integer('roomCount');
  });
};
