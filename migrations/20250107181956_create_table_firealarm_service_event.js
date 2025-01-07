/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('service_events').createTable('firealarm_service_event', tbl => {
    tbl
      .uuid('event_id')
      .primary()
      .references('id')
      .inTable('event')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('service_work_type_id')
      .notNullable()
      .references('id')
      .inTable('service_events.firealarm_service_type')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('service_events').dropTable('firealarm_service_event');
};
