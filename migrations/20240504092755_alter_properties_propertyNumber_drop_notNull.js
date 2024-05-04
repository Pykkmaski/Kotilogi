/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'properties';
const column = 'propertyNumber';

exports.up = function (knex) {
  return knex.schema.table(tablename, tbl => {
    tbl.setNullable(column);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table(tablename, tbl => {
    tbl.dropNullable(column);
  });
};
