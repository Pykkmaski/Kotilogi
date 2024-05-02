/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('bills', tbl => {
    tbl.dropForeign('customer');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('bills', tbl => {
    tbl
      .foreign('customer')
      .references('email')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};
