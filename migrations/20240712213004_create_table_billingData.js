/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'billingData';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.uuid('id').unique().primary().defaultTo(knex.fn.uuid());
    tbl
      .uuid('refId')
      .notNullable()
      .references('id')
      .inTable('objectData')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .uuid('customerId')
      .notNullable()
      .references('id')
      .inTable('userData')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.integer('amount').notNullable();
    tbl.bigint('due').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
