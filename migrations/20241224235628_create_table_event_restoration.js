/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('events').createTable('restoration', tbl => {
    tbl
      .uuid('event_id')
      .primary()
      .references('id')
      .inTable('events.data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .uuid('previous_event_id')
      .references('id')
      .inTable('events.data')
      .onUpdate('CASCADE')
      .comment(
        'Restoration events will always refer back to a previous restoration- or genesis-event.'
      );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('events').dropTable('restoration');
};
