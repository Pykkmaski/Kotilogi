/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'billing';
const columnname = 'stamp';
const values = [
    'add_property',
    'add_event',
    'add_usage',
    'add_file',
];

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.string(columnname).checkIn(values).notNullable();
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
