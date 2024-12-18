/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('windows').createTable('data', tbl => {
    tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
    tbl
      .uuid('event_id')
      .notNullable()
      .references('id')
      .inTable('events.data')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.text('description');
    tbl.float('u_value', 8, 2);
    tbl.integer('min_db_rating');
    tbl.integer('max_db_rating');
    tbl.integer('quantity');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('windows').dropTable('data');
};
