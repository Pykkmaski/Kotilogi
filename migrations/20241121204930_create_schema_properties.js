/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const schemaName = 'properties';

exports.up = function (knex) {
  return knex.raw('CREATE SCHEMA ??', [schemaName]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw('DROP SCHEMA IF EXISTS ??', [schemaName]);
};
