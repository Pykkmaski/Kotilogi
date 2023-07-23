/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'user_activation_codes';
const columnNames = {
    user : 'user',
    activationCode: 'activation_code',
    createdAt: 'created_at',
}

exports.up = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    tbl.increments('id');
    tbl.string(columnNames.user).unique().references('email').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    tbl.string(columnNames.activationCode).unique().notNullable();
    tbl.bigInteger(columnNames.createdAt).defaultTo(new Date().getTime());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
