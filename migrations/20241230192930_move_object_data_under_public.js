/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE objects.data RENAME TO object')
    .raw('ALTER TABLE objects.object RENAME CONSTRAINT "objectData_pkey" TO object_pkey')
    .raw('ALTER TABLE objects.object SET SCHEMA public');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('ALTER TABLE object RENAME TO data')
    .raw('ALTER TABLE data SET SCHEMA objects');
};
