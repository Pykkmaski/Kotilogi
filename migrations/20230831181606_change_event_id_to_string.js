/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const crypto = require('crypto');

const tableName = 'property_events';
const columnName = 'id';

exports.up = async function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.string(columnName).alter();
        tbl.string('property_id').alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.integer(columnName).alter();
        tbl.integer('property_id').alter();
    });
};
