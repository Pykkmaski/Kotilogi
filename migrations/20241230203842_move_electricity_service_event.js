/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE electricity.service_work RENAME TO electricity_service_event')
    .raw(
      'ALTER TABLE electricity.electricity_service_event RENAME CONSTRAINT service_work_pkey TO electricity_service_event_pkey'
    )
    .raw('ALTER TABLE electricity.electricity_service_event SET SCHEMA service_events')
    .raw('DROP SCHEMA electricity');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
