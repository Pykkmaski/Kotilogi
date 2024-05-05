/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const oldTable = 'editHistory';
const newTable = 'history';

exports.up = function (knex) {
  return knex.schema.dropTableIfExists(table).createTable(newTable, tbl => {
    tbl.increments('id');
    tbl.string('author').references('email').inTable('users').onUpdate('CASCADE');
    tbl.bigint('timestamp');
    tbl.string('oldValue');
    tbl.string('newValue');
    tbl.string('targetId');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
