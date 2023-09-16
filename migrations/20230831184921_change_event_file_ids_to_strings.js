/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const crypto = require('crypto');

const tableName = 'event_files';
const columnName = 'id';

exports.up = async function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.string(columnName).alter();
        tbl.string('event_id').alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.integer(columnName).alter();
        tbl.integer('event_id').alter();
    });
};
