/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('properties', tbl => {
    tbl.dropForeign();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('properties', tbl => {
    tbl
      .foreign('refId')
      .references('email')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};
