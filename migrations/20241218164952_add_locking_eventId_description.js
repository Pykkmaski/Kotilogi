/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('locking')
    .alterTable('data', tbl => {
      tbl.text('description');
      tbl.dropPrimary('data_lockEvents_pkey');
      tbl.renameColumn('id', 'event_id');
    })
    .alterTable('data', tbl => {
      tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
