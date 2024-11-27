/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const schemaName = 'roofs';

exports.up = function (knex) {
  return knex.schema.raw('CREATE SCHEMA IF NOT EXISTS ??', [schemaName]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw('DROP SCHEMA IF EXISTS ??', [schemaName]);
};
