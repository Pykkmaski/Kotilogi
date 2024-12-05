/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('electricity').createTable('restoration_work', tbl => {
    tbl
      .uuid('event_id')
      .primary()
      .references('id')
      .inTable('events.data')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('restoration_work_target_id')
      .notNullable()
      .references('id')
      .inTable('electricity.restoration_work_target')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('electricity').dropTable('restoration_work');
};
