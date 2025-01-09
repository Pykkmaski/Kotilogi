/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('restoration_events')
    .alterTable('electricity_restoration_event', tbl => {
      tbl.dropPrimary('restoration_work_pkey');
    })
    .alterTable('electricity_restoration_event', tbl => {
      tbl.uuid('id').defaultTo(knex.fn.uuid());
      tbl.primary('id', {
        constraintName: 'electricity_restoration_event_pkey',
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
