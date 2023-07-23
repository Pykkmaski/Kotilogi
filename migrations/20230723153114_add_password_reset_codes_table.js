/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'password_reset_codes';
const columnNames = {
    user: 'user',
    resetCode: 'reset_code'
}

exports.up = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    tbl.string(columnNames.user).references('email').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    tbl.string(columnNames.resetCode).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table(tableName, tbl => {
    tbl.dropColumns(columnNames.user, columnNames.resetCode);
  });
};
