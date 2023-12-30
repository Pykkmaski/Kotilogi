/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const columnName = 'consolidationTime', tableName = 'propertyEvents';

exports.up = function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.string(columnName).comment('Time at when the event becomes undeletable through the api.').notNullable().defaultTo('0');
    });
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
