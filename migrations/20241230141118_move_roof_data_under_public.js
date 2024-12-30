/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE roofs.data RENAME TO roof')
    .raw('ALTER TABLE roofs.roof SET SCHEMA public')
    .raw('ALTER TABLE roof RENAME CONSTRAINT overview_pkey TO roof_pkey');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('ALTER TABLE roof RENAME TO data')
    .raw('ALTER TABLE data SET SCHEMA roofs')
    .raw('ALTER TABLE roofs.data RENAME CONSTRAINT roof_pkey TO overview_pkey');
};
