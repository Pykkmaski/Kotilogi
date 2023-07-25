/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'user_activation_codes';
const columnNames = {
    user : 'user',
    activationCode: 'activation_code',
    expires: 'expires',
}

exports.up = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    tbl.increments('id');
    tbl.string(columnNames.user).unique().references('email').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    tbl.string(columnNames.activationCode).unique().notNullable();
    tbl.bigInteger(columnNames.expires).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
