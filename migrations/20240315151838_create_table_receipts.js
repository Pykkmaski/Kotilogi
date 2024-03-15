/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'receipts';

exports.up = function(knex) {
    return knex.schema.createTable(tablename, tbl => {
        tbl.string('id').unique().primary().notNullable();
        tbl.string('customer').notNullable().references('email').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        tbl.bigint('paidOn').notNullable();
        tbl.bigint('amount').notNullable();
        tbl.bigint('expires').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists(tablename);
};
