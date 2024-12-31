/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE roofs.data RENAME TO roof')
    .raw('ALTER TABLE roofs.roof RENAME CONSTRAINT data_pkey TO roof_pkey')
    .raw('ALTER TABLE roofs.roof SET SCHEMA public');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('ALTER TABLE roof RENAME TO data')
    .raw('ALTER TABLE data SET SCHEMA roofs');
};
