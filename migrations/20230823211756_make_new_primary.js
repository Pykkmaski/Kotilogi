/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'users';
const columnName = 'email';

exports.up = function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.primary(columnName);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.dropPrimary();
    });
};
