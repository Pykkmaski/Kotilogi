/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE sewer_pipe.service_work RENAME TO sewer_pipe_service_event')
    .raw(
      'ALTER TABLE sewer_pipe.sewer_pipe_service_event RENAME CONSTRAINT service_work_pkey TO sewer_pipe_service_event_pkey'
    )
    .raw('ALTER TABLE sewer_pipe.sewer_pipe_service_event SET SCHEMA service_events')
    .raw('DROP SCHEMA sewer_pipe');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
