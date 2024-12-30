/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE heating.service_work RENAME TO heating_service_event')
    .raw(
      'ALTER TABLE heating.heating_service_event RENAME CONSTRAINT service_work_pkey TO heating_service_event_pkey'
    )
    .raw('ALTER TABLE heating.heating_service_event SET SCHEMA service_events');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
