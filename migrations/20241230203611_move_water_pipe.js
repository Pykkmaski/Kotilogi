/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE water_pipe.service_work RENAME TO water_pipe_service_event')
    .raw(
      'ALTER TABLE water_pipe.water_pipe_service_event RENAME CONSTRAINT service_work_pkey TO water_pipe_service_event_pkey'
    )
    .raw('ALTER TABLE water_pipe.water_pipe_service_event SET SCHEMA service_events')
    .raw('DROP SCHEMA water_pipe');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
