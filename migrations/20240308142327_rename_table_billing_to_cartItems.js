/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const oldName = 'billing';
const newName = 'cartItems';

exports.up = function(knex) {
  return knex.schema.renameTable(oldName, newName);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.renameTable(newName, oldName);
};
