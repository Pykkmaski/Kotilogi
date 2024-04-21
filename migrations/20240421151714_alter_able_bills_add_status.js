/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('bills', tbl => {
    tbl.string('status').checkIn(['paid', 'unpaid', 'refunded']).defaultTo('unpaid');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('bills', tbl => {
    tbl.dropColumn('status');
  });
};
