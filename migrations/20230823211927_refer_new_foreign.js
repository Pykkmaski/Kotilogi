/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'properties';
const columnName = 'owner';

exports.up = function(knex) {
    return knex.schema.table(tableName, tbl => {
        tbl.dropForeign('owner');
        tbl.foreign(columnName).references('email').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table(tableName, tbl => {
        tbl.dropForeign('email');
        tbl.foreign('owner').references('username').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    })
};
