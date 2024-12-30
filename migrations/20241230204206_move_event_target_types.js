/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE events.targets RENAME TO event_target_type')

    .raw('ALTER TABLE events.event_target_type SET SCHEMA types');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
