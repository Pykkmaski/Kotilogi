/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tablename = 'users';
const columnname = 'trial';

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.boolean(columnname).defaultTo(true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropColumn(columnname);
  })
};
