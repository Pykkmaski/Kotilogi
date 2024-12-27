/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const label = 'Genesis';

exports.up = function (knex) {
  return knex('types.event_type').insert({
    label,
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex('types.event_type').where({ label }).del();
};
