/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('heating').createTable('restoration_event', tbl => {
    tbl
      .uuid('event_id')
      .primary()
      .references('id')
      .inTable('events.data')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.uuid('old_system_id').unique().references('id').inTable('heating.data').onUpdate('CASCADE');
    tbl
      .uuid('new_system_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable('heating.data')
      .onUpdate('CASCADE');

    tbl.unique(['old_system_id', 'new_system_id']);
    tbl.check('?? <> ??', ['old_system_id', 'new_system_id'], 'old_system_not_equal_to_new_system');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('heating.restoration_event');
};
