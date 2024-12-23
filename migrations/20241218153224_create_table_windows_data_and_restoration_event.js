/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('windows')
    .createTable('data', tbl => {
      tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
      tbl
        .uuid('event_id')
        .notNullable()
        .references('id')
        .inTable('events.data')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      tbl.string('name', 50);
      tbl.float('u_value', 8, 2);
      tbl.integer('min_db_rating');
      tbl.integer('max_db_rating');
      tbl.integer('quantity');
    })
    .createTable('restoration_event', tbl => {
      tbl
        .uuid('event_id')
        .primary()
        .notNullable()
        .references('id')
        .inTable('events.data')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .uuid('old_window_id')
        .unique()
        .references('id')
        .inTable('windows.data')
        .onUpdate('CASCADE');
      tbl
        .uuid('new_window_id')
        .unique()
        .notNullable()
        .references('id')
        .inTable('windows.data')
        .onUpdate('CASCADE');

      tbl.check('?? <> ??', ['old_window_id', 'new_window_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('windows').dropTable('restoration_event').dropTable('data');
};
