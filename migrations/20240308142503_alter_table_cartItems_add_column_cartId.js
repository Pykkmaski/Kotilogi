/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'cartItems';
const columnname = 'cartId';

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.integer(columnname).notNullable().references('id').inTable('carts').onUpdate('CASCADE').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropColumn(columnname);
  });
};
