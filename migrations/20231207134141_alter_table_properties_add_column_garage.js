/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'properties';
const columnName = 'hasGarage';

exports.up = function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.boolean(columnName).defaultTo(false);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.dropColumn(columnName);
  });
};
