/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'billing';
const columnname = 'customer';

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropUnique(columnname);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
