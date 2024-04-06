/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'properties';
const columnname = 'status';

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropColumn(columnname);
  })
  .alterTable(tablename, tbl => {
    tbl.string(columnname).notNullable().checkIn(['ok', 'deactivated', 'pending_payment']).defaultTo('ok');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
