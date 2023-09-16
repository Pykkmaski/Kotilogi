/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const crypto = require('crypto');

const tableName = 'properties';
const columnName = 'id';

exports.up = async function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.string(columnName).alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.integer(columnName).alter();
    });
};
