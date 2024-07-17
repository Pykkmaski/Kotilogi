/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'userData';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.uuid('id').unique().primary().defaultTo(knex.fn.uuid());
    tbl.string('email').notNullable();
    tbl.string('password').notNullable();
    tbl.integer('status');
    tbl.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
