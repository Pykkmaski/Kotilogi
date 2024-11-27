/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'data_roofEvents';

exports.up = function (knex) {
  return knex.schema.raw('alter table ?? set schema roofs', [tablename]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw('alter table ?? set schema public', [tablename]);
};
