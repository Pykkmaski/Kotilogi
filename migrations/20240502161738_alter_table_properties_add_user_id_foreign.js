/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('properties', tbl => {
    tbl.foreign('refId').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('properties', tbl => {
    tbl.dropForeign('refId');
  });
};
