/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const oldname = 'data_roofEvents';

exports.up = function (knex) {
  return knex.schema.renameTable(`roofs.${oldname}`, 'data');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.renameTable(`roofs.data`, oldname);
};
