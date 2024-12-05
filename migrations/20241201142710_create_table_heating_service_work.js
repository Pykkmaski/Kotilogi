/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('heating').createTable('service_work', tbl => {
    tbl
      .uuid('event_id')
      .primary()
      .references('id')
      .inTable('events.data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('service_work_type')
      .notNullable()
      .references('id')
      .inTable('heating.service_work_type')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('heating').dropTable('service_work');
};
