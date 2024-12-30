/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('service_events')
    .createTable('window_service_type', tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique().notNullable();
    })
    .createTable('window_service_event', tbl => {
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
        .inTable('service_events.window_service_type')
        .onUpdate('CASCADE');
    })
    .then(async () => {
      await knex('service_events.window_service_type').insert([
        { label: 'Muu' },
        { label: 'Pesu' },
      ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('service_events')
    .dropTable('window_service_event')
    .dropTable('window_service_type');
};
