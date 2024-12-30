/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE property.appartments RENAME TO appartment')
    .raw(
      'ALTER TABLE property.appartment RENAME CONSTRAINT "appartmentData_pkey" TO appartment_pkey'
    )
    .raw('ALTER TABLE property.appartment SET SCHEMA public');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('ALTER TABLE appartment RENAME TO appartments')
    .raw('ALTER TABLE appartments SET SCHEMA property');
};
