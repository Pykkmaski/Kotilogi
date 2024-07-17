/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'utilityData';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .uuid('id')
      .notNullable()
      .unique()
      .primary()
      .references('id')
      .inTable('objectData')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.integer('type').notNullable();
    tbl.integer('monetaryAmount').notNullable();
    tbl.integer('unitAmount').notNullable();
    tbl.bigint('time').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
