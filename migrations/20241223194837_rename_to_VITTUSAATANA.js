/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('drainage_ditches').alterTable('data', tbl => {
    tbl.renameColumn('id', 'event_id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('drainage_ditches').alterTable('data', tbl => {
    tbl.renameColumn('event_id', 'id');
  });
};
