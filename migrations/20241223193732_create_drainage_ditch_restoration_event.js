/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('drainage_ditches')

    .createTable('restoration_event', tbl => {
      tbl
        .uuid('event_id')
        .primary()
        .references('id')
        .inTable('events.data')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .uuid('old_entry_id')
        .references('id')
        .inTable('drainage_ditches.data')
        .onUpdate('CASCADE');
      tbl
        .uuid('new_entry_id')
        .references('id')
        .inTable('drainage_ditches.data')
        .onUpdate('CASCADE');
      tbl.check('?? <> ??', ['new_entry_id', 'old_entry_id']);
      tbl.unique(['new_entry_id', 'old_entry_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('drainage_ditches').dropTable('restoration_event');
};
