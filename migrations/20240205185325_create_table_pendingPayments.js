/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'payments';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    tbl.increments('id');
    tbl.string('userEmail').notNullable().references('email').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.string('dueDate').notNullable().comment('The UNIX date at which the payment must be made at the latest.');
    tbl.string('paidOn').comment('The UNIX date at which the payment was made. Set to NULL if not yet paid.')
    tbl.integer('amount').notNullable().comment('The amount owed in fractional monetary units.');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
