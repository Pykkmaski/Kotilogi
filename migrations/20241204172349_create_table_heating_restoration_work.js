/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('heating').createTable('heating_restoration_work', tbl => {
    tbl
      .uuid('event_id')
      .primary()
      .references('id')
      .inTable('events.data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.integer('old_system_id').references('id').inTable('heating.types').onUpdate('CASCADE');
    tbl.integer('new_system_id').references('id').inTable('heating.types').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('heating').dropTable('heating_restoration_work');
};
