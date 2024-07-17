/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'objectData';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.uuid('id').unique().primary().defaultTo(knex.fn.uuid());
    tbl.string('title');
    tbl.string('description');
    tbl.uuid('parentId').references('id').inTable(table).onUpdate('CASCADE').onDelete('CASCADE');
    tbl
      .uuid('authorId')
      .notNullable()
      .references('id')
      .inTable('userData')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.bigint('timestamp').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
