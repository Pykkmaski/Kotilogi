/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'bills';

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropColumn('cartId');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.string('cartId').notNullable().references('id').inTable('carts').onUpdate('CASCADE').onDelete('CASCADE');
  });
};
