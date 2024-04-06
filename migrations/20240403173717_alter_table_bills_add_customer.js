/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'bills';

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.string('customer').notNullable().references('email').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropColumn('customer');
  });
};
