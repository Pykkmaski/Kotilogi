/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE restoration_events.insulation_restoration_event SET SCHEMA public')
    .raw('ALTER TABLE insulation_restoration_event RENAME TO insulation')
    .alterTable('insulation', tbl => {
      tbl.dropPrimary('data_eristeEvents_pkey');
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
