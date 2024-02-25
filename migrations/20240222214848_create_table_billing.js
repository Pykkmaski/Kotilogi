/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'billing';

exports.up = function(knex) {
  return knex.schema.createTable(tablename, tbl => {
    tbl.increments('id');
    tbl.string('customer').unique().notNullable().references('email').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.string('productId').notNullable();
    tbl.string('productTitle').notNullable();
    tbl.string('timestamp').notNullable();
    tbl.integer('price').notNullable();
    tbl.integer('tax').notNullable();
    tbl.string('cardToken').notNullable();
    tbl.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tablename);
};
