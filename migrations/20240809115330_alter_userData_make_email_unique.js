/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_users';

exports.up = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.string('email').notNullable().unique().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.dropUnique('email');
  });
};
