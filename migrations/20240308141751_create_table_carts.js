/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'carts';

exports.up = function(knex) {
  return knex.schema.createTable(tablename, tbl => {
    tbl.increments('id');
    tbl.string('customer').notNullable().unique().references('email').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.bigint('due').comment('The point in time this cart must be paid for.').notNullable();
    tbl.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tablename);
};
