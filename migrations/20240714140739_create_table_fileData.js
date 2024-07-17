/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'fileData';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .uuid('id')
      .unique()
      .primary()
      .notNullable()
      .references('id')
      .inTable('objectData')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('type');
    tbl.string('name');
    tbl.integer('size');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
