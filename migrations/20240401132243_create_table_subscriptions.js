/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'subscriptions';

exports.up = function(knex) {
  return knex.schema.createTable(tablename, () => {
    tbl.increments('id');
    tbl.string('customer').notNullable().references('email').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.string('type').notNullable();
    tbl.bigint('due').notNullable();
    tbl.bigint('paidLast').notNUllable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tablename);
};
