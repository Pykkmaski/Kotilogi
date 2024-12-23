/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('sewer_pipe')
    .alterTable('restoration_work', tbl => tbl.renameColumn('id', 'event_id'));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('sewer_pipe')
    .alterTable('restoration_work', tbl => tbl.renameColumn('event_id', 'id'));
};
