/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const label = 'Genesis';

exports.up = function (knex) {
  return knex('events.types').insert({
    label,
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex('events.types').where({ label }).del();
};
