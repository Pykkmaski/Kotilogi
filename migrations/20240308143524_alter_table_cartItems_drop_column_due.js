/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'cartItems';
const columnname = 'due';

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropColumn(columnname);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
