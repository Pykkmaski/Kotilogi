/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE windows.data RENAME CONSTRAINT data_pkey TO window_pkey')
    .raw('ALTER TABLE windows.data RENAME TO "window"')
    .raw('ALTER TABLE windows.window SET SCHEMA public')
    .raw('DROP TABLE windows.restoration_event')
    .raw('DROP SCHEMA windows');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('CREATE SCHEMA windows')
    .raw('ALTER TABLE window SET SCHEMA windows')
    .raw('ALTER TABLE windows.window RENAME CONSTRAINT window_pkey TO data_pkey')
    .raw('ALTER TABLE windows.window RENAME TO data');
};
