/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE structures.service_work RENAME TO structures_service_event')
    .raw(
      'ALTER TABLE structures.structures_service_event RENAME CONSTRAINT service_work_pkey TO structures_service_event_pkey'
    )
    .raw('ALTER TABLE structures.structures_service_event SET SCHEMA service_events')
    .raw('DROP SCHEMA structures');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
