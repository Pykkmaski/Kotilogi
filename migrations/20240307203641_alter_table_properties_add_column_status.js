/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'properties';
const columnname = 'status';
const values = ['ok', 'pending_payment'];

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.string(columnname).checkIn(values).defaultTo('pending_payment').notNullable();
  });
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
