/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'users';
const columnName = 'plan';
const plans = [
    'regular',
    'pro',
    'enterprise'
];

exports.up = function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.string(columnName, 11).checkIn(plans).defaultTo(planes.at(-1)).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.dropColumn(columnName);
    })
};
