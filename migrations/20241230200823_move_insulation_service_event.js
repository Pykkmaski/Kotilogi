/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE insulation.service_work RENAME TO insulation_service_event')
    .raw(
      'ALTER TABLE insulation.insulation_service_event RENAME CONSTRAINT service_work_pkey TO insulation_service_event_pkey'
    )
    .raw('ALTER TABLE insulation.insulation_service_event SET SCHEMA service_events');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
