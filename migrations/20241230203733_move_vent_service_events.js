/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE ventilation.service_work RENAME TO ventilation_service_event')
    .raw(
      'ALTER TABLE ventilation.ventilation_service_event RENAME CONSTRAINT service_work_pkey TO ventilation_service_event_pkey'
    )
    .raw('ALTER TABLE ventilation.ventilation_service_event SET SCHEMA service_events')
    .raw('DROP SCHEMA ventilation');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
