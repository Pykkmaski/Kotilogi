/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('blog_posts', tbl => {
    tbl.increments('id');
    tbl.string('title', 64);
    tbl.text('content');
    tbl.date('date').defaultTo(knex.raw('CURRENT_DATE'));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('blog_posts');
};
