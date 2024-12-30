/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE drainage_ditches.service_work RENAME TO drainage_ditch_service_event')
    .raw(
      'ALTER TABLE drainage_ditches.drainage_ditch_service_event RENAME CONSTRAINT service_work_pkey TO drainage_ditch_service_event_pkey'
    )
    .raw('ALTER TABLE drainage_ditches.drainage_ditch_service_event SET SCHEMA service_events')
    .raw('DROP SCHEMA drainage_ditches');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
