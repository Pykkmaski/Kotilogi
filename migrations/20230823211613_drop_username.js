/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'users';
const columnName = 'username';

exports.up = function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.dropColumn(columnName);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.string(columnName).primary();
    });
};
