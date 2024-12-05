/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('roofs').createTable('service_work', tbl => {
    tbl
      .uuid('event_id')
      .primary()
      .references('id')
      .inTable('events.data')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('service_work_type_id')
      .notNullable()
      .references('id')
      .inTable('roofs.service_work_type')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.shcema.withSchema('roofs').dropTable('service_work');
};
