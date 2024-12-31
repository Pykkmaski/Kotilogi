/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE property.overview RENAME TO property')
    .raw('ALTER TABLE property.property RENAME CONSTRAINT "PK_PROPERTIES" TO property_pkey')
    .raw('ALTER TABLE property.property SET SCHEMA public');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('ALTER TABLE property SET SCHEMA property')
    .raw('ALTER TABLE property.property RENAME TO overview');
};
